import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const mediaSchema = z.object({ name: z.string().min(1).max(120), type: z.string().regex(/^(image\/(jpeg|png|webp)|audio\/(mpeg|mp4|wav|ogg))$/), data: z.string().max(8_000_000), category: z.enum(["cover", "gallery", "logo", "graphics", "music"]) });
const requestSchema = z.object({
  eventType: z.string().min(1).max(100), template: z.enum(["Editorial", "Romance", "Celebration"]),
  eventName: z.string().min(1).max(200), hostName: z.string().min(1).max(200), eventDate: z.string().min(1), eventTime: z.string().min(1).max(100),
  venue: z.string().min(1).max(200), address: z.string().max(500), mapsUrl: z.union([z.literal(""), z.string().url().max(1000)]), dressCode: z.string().max(200), description: z.string().max(3000), schedule: z.string().max(3000),
  rsvp: z.object({ enabled: z.boolean(), deadline: z.string(), fields: z.array(z.string()).max(8), plusOne: z.boolean(), customQuestions: z.string().max(2000) }),
  package: z.enum(["Essential", "Signature", "Experience"]), clientName: z.string().min(1).max(200), clientPhone: z.string().min(5).max(50), clientEmail: z.string().email().max(250),
  media: z.array(mediaSchema).max(12),
});

export const submitInvitation = createServerFn({ method: "POST" })
  .inputValidator((data) => requestSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = crypto.randomUUID();
    const mediaPaths: Record<string, string[]> = {};
    for (const file of data.media) {
      const extension = file.type.startsWith("image/") ? file.type.split("/")[1] : file.type.split("/")[1];
      const path = `${id}/${file.category}/${crypto.randomUUID()}.${extension}`;
      const bytes = Uint8Array.from(atob(file.data), character => character.charCodeAt(0));
      const { error } = await supabaseAdmin.storage.from("invitation-requests").upload(path, bytes, { contentType: file.type, upsert: false });
      if (error) throw new Error("We couldn't upload one of your files. Please try again.");
      mediaPaths[file.category] = [...(mediaPaths[file.category] ?? []), path];
    }
    const { error } = await supabaseAdmin.from("invitation_requests").insert({
      id, event_type: data.eventType, template: data.template, event_name: data.eventName,
      host_name: data.hostName, event_date: data.eventDate, event_time: data.eventTime,
      venue: data.venue, address: data.address, maps_url: data.mapsUrl, dress_code: data.dressCode,
      description: data.description, schedule: data.schedule, media_paths: mediaPaths,
      rsvp_settings: data.rsvp, package: data.package, client_name: data.clientName,
      client_phone: data.clientPhone, client_email: data.clientEmail,
    });
    if (error) throw new Error("We couldn't send your request. Please try again.");
    return { id };
  });