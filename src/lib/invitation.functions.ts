import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const mediaSchema = z.object({
  name: z.string().min(1).max(120),
  type: z.string().regex(/^(image\/(jpeg|png|webp)|audio\/(mpeg|mp4|wav|ogg))$/),
  data: z.string().max(8_000_000),
  category: z.enum(["cover", "gallery", "logo", "graphics", "music"]),
});

const requestSchema = z.object({
  eventType: z.string().min(1).max(100), template: z.enum(["Editorial", "Romance", "Celebration"]),
  eventName: z.string().min(1).max(200), hostName: z.string().min(1).max(200), eventDate: z.string().min(1), eventTime: z.string().min(1).max(100),
  venue: z.string().min(1).max(200), address: z.string().max(500), mapsUrl: z.union([z.literal(""), z.string().url().max(1000)]), dressCode: z.string().max(200), description: z.string().max(3000), schedule: z.string().max(3000),
  rsvp: z.object({ enabled: z.boolean(), deadline: z.string(), fields: z.array(z.string()).max(8), plusOne: z.boolean(), customQuestions: z.string().max(2000) }),
  package: z.enum(["Essential", "Signature", "Experience"]), clientName: z.string().min(1).max(200), clientPhone: z.string().min(5).max(50), clientEmail: z.string().email().max(250),
  media: z.array(mediaSchema).max(12),
});

export const submitInvitation = createServerFn({ method: "POST" })
  .validator((data) => requestSchema.parse(data))
  .handler(async ({ data }) => {
    const { createInvitationOrder } = await import("@/integrations/dashboard.server");
    const requestId = crypto.randomUUID();

    return createInvitationOrder({
      requestId,
      eventType: data.eventType,
      template: data.template,
      eventName: data.eventName,
      hostName: data.hostName,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
      venue: data.venue,
      address: data.address,
      mapsUrl: data.mapsUrl,
      dressCode: data.dressCode,
      description: data.description,
      schedule: data.schedule,
      rsvp: data.rsvp,
      package: data.package,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail,
      media: data.media.map(({ name, category }) => ({ name, category, path: "" })),
    });
  });
