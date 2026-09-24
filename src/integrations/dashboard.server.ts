import { createClient } from "@supabase/supabase-js";

let client: ReturnType<typeof createClient> | undefined;

function getDashboardAdmin() {
  if (client) return client;

  const url = process.env["EVIAKE_SUPABASE_URL"];
  const serviceRoleKey = process.env["EVIAKE_SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !serviceRoleKey) {
    throw new Error("The Evia Invites dashboard connection is not configured.");
  }

  client = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return client;
}

export async function createInvitationOrder(input: {
  requestId: string;
  eventType: string;
  template: string;
  eventName: string;
  hostName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  address: string;
  mapsUrl: string;
  dressCode: string;
  description: string;
  schedule: string;
  rsvp: {
    enabled: boolean;
    deadline: string;
    fields: string[];
    plusOne: boolean;
    customQuestions: string;
  };
  package: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  media: { name: string; category: string; path: string }[];
}) {
  const dashboard = getDashboardAdmin();
  const { data: business, error: businessError } = await dashboard
    .from("businesses")
    .select("id")
    .eq("slug", "evia_invites")
    .single();
  if (businessError || !business) throw new Error("Evia Invites business is not configured.");

  const { data: existingOrder, error: existingError } = await dashboard
    .from("orders")
    .select("id")
    .eq("source_request_id", input.requestId)
    .maybeSingle();
  if (existingError)
    throw new Error("We couldn't check whether this request was already received.");
  if (existingOrder) return existingOrder.id;

  const email = input.clientEmail.trim().toLowerCase();
  const { data: existingClient } = await dashboard
    .from("clients")
    .select("id")
    .eq("business_id", business.id)
    .eq("email", email)
    .maybeSingle();

  let clientId = existingClient?.id;
  if (!clientId) {
    const { data: newClient, error: clientError } = await dashboard
      .from("clients")
      .insert({
        business_id: business.id,
        name: input.clientName.trim(),
        email,
        phone: input.clientPhone.trim(),
        notes: `Invitation request: ${input.eventName.trim()}`,
      })
      .select("id")
      .single();
    if (clientError || !newClient)
      throw new Error("We couldn't create the invitation client record.");
    clientId = newClient.id;
  }

  const notes = [
    "Submitted from eviainvites.com",
    `Event: ${input.eventName}`,
    `Type: ${input.eventType}`,
    `Host / celebrant: ${input.hostName}`,
    `Date and time: ${input.eventDate} ${input.eventTime}`,
    `Venue: ${input.venue}${input.address ? `, ${input.address}` : ""}`,
    input.dressCode ? `Dress code: ${input.dressCode}` : "",
    input.description ? `Description: ${input.description}` : "",
    input.schedule ? `Schedule: ${input.schedule}` : "",
    `RSVP: ${input.rsvp.enabled ? "Enabled" : "Disabled"}`,
    input.rsvp.enabled && input.rsvp.deadline ? `RSVP deadline: ${input.rsvp.deadline}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const packageTotals: Record<string, number> = {
    Essential: 2000,
    Signature: 3500,
    Experience: 6000,
  };

  const { data: order, error: orderError } = await dashboard
    .from("orders")
    .insert({
      business_id: business.id,
      client_id: clientId,
      status: "payment_pending",
      package: input.package,
      total_kes: packageTotals[input.package] ?? 0,
      deadline: input.eventDate,
      notes,
      source_request_id: input.requestId,
      invitation_details: {
        eventType: input.eventType,
        template: input.template,
        eventName: input.eventName,
        hostName: input.hostName,
        eventDate: input.eventDate,
        eventTime: input.eventTime,
        venue: input.venue,
        address: input.address,
        mapsUrl: input.mapsUrl,
        dressCode: input.dressCode,
        description: input.description,
        schedule: input.schedule,
        rsvp: input.rsvp,
        media: input.media,
      },
    })
    .select("id")
    .single();
  if (orderError || !order) throw new Error("We couldn't add the invitation to the dashboard.");
  return order.id;
}
