import { z } from "zod";

const requestSchema = z.object({
  eventType: z.string().min(1).max(100), template: z.enum(["Editorial", "Romance", "Celebration"]),
  eventName: z.string().min(1).max(200), hostName: z.string().min(1).max(200), eventDate: z.string().min(1), eventTime: z.string().min(1).max(100),
  venue: z.string().min(1).max(200), address: z.string().max(500), mapsUrl: z.union([z.literal(""), z.string().url().max(1000)]), dressCode: z.string().max(200), description: z.string().max(3000), schedule: z.string().max(3000),
  rsvp: z.object({ enabled: z.boolean(), deadline: z.string(), fields: z.array(z.string()).max(8), plusOne: z.boolean(), customQuestions: z.string().max(2000) }),
  package: z.enum(["Essential", "Signature", "Experience"]), clientName: z.string().min(1).max(200), clientPhone: z.string().min(5).max(50), clientEmail: z.string().email().max(250),
  media: z.array(z.object({ name: z.string().min(1).max(120), type: z.string(), data: z.string(), category: z.enum(["cover", "gallery", "logo", "graphics", "music"]) })).max(12),
});

export async function submitInvitation({ data }: { data: unknown }) {
  const invitation = requestSchema.parse(data);
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;
  if (!url || !anonKey) throw new Error("Invitation submissions are not configured yet.");

  const details = {
    eventType: invitation.eventType, template: invitation.template, eventName: invitation.eventName, hostName: invitation.hostName,
    eventDate: invitation.eventDate, eventTime: invitation.eventTime, venue: invitation.venue, address: invitation.address,
    mapsUrl: invitation.mapsUrl, dressCode: invitation.dressCode, description: invitation.description, schedule: invitation.schedule,
    rsvp: invitation.rsvp, media: invitation.media.map(({ name, category }) => ({ name, category })),
  };
  const notes = [
    "Submitted from eviainvites.com", `Event: ${invitation.eventName}`, `Type: ${invitation.eventType}`,
    `Host / celebrant: ${invitation.hostName}`, `Date and time: ${invitation.eventDate} ${invitation.eventTime}`,
    `Venue: ${invitation.venue}${invitation.address ? `, ${invitation.address}` : ""}`,
    invitation.dressCode ? `Dress code: ${invitation.dressCode}` : "", invitation.description ? `Description: ${invitation.description}` : "",
    invitation.schedule ? `Schedule: ${invitation.schedule}` : "", `RSVP: ${invitation.rsvp.enabled ? "Enabled" : "Disabled"}`,
  ].filter(Boolean).join("\n");

  const response = await fetch(`${url}/rest/v1/rpc/submit_invitation`, {
    method: "POST",
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_source_request_id: crypto.randomUUID(), p_name: invitation.clientName, p_email: invitation.clientEmail, p_phone: invitation.clientPhone, p_package: invitation.package, p_event_date: invitation.eventDate, p_notes: notes, p_details: details }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(body?.message || "We couldn't submit your invitation. Please try again.");
  }
  return response.json() as Promise<string>;
}
