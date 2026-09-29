import { createClient } from "@supabase/supabase-js";

let client: ReturnType<typeof createClient> | undefined;

function createSupabaseFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    if ((key.startsWith("sb_publishable_") || key.startsWith("sb_secret_")) && headers.get("Authorization") === `Bearer ${key}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

function getDashboardClient() {
  if (client) return client;

  const url = process.env["EVIAKE_SUPABASE_URL"] || process.env["SUPABASE_URL"] || import.meta.env.VITE_SUPABASE_URL;
  const key = process.env["EVIAKE_SUPABASE_SERVICE_ROLE_KEY"] ||
    process.env["SUPABASE_SERVICE_ROLE_KEY"] ||
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["SUPABASE_ANON_KEY"] ||
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured for invitation submissions.");
  }

  client = createClient(url, key, {
    global: { fetch: createSupabaseFetch(key) },
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
  const dashboard = getDashboardClient();
  const { data: orderId, error } = await dashboard.rpc("submit_invitation", {
    p_source_request_id: input.requestId,
    p_name: input.clientName,
    p_email: input.clientEmail,
    p_phone: input.clientPhone,
    p_package: input.package,
    p_event_date: input.eventDate,
    p_notes: notes,
    p_details: {
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
  });
  if (error || !orderId) throw new Error(error?.message || "We couldn't add the invitation to the dashboard.");
  return orderId as string;
}
