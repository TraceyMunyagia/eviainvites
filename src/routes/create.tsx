import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, ImagePlus, Music2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventTypes, packages, templates } from "@/lib/invites";
import { submitInvitation } from "@/lib/invitation.functions";

export const Route = createFileRoute("/create")({
  validateSearch: (search: Record<string, unknown>): { event?: string; template?: string; package?: string } => ({ ...(typeof search["event"] === "string" ? { event: search["event"] } : {}), ...(typeof search["template"] === "string" ? { template: search["template"] } : {}), ...(typeof search["package"] === "string" ? { package: search["package"] } : {}) }),
  head: () => ({ meta: [
    { title: "Create Your Invitation — Evia Invites" }, { name: "description", content: "Tell Evia about your celebration, choose a template and package, and send your invitation design request." }, { property: "og:title", content: "Create Your Invitation — Evia Invites" }, { property: "og:description", content: "Begin your personalized digital invitation with Evia." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Create,
});

type FileGroup = "cover" | "gallery" | "logo" | "graphics" | "music";
type Data = {
  eventType: string; template: string; eventName: string; hostName: string; eventDate: string; eventTime: string; venue: string; address: string; mapsUrl: string; dressCode: string; description: string; schedule: string;
  rsvpEnabled: boolean; deadline: string; fields: string[]; plusOne: boolean; customQuestions: string;
  package: string; clientName: string; clientPhone: string; clientEmail: string;
};
const stepNames = ["Event", "Template", "Details", "Media", "RSVP", "Package", "Your details"];
const rsvpFields = ["Full name", "Phone", "Email", "Number of guests", "Dietary requirements"];
const fileInputs: { key: FileGroup; label: string; hint: string; accept: string; multiple?: boolean }[] = [
  { key: "cover", label: "Cover image", hint: "The first impression for your invitation", accept: "image/jpeg,image/png,image/webp" },
  { key: "gallery", label: "Gallery images", hint: "Add the moments you'd love to share", accept: "image/jpeg,image/png,image/webp", multiple: true },
  { key: "logo", label: "Logo", hint: "Optional event monogram or logo", accept: "image/jpeg,image/png,image/webp" },
  { key: "graphics", label: "Event graphics", hint: "Any artwork or details you have in mind", accept: "image/jpeg,image/png,image/webp", multiple: true },
  { key: "music", label: "Background music", hint: "An optional audio file for your invitation", accept: "audio/mpeg,audio/mp4,audio/wav,audio/ogg" },
];

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-xs font-semibold text-foreground">{label}{required && <span className="ml-1 text-gold">*</span>}</span>{children}</label> }

function Create() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({ eventType: eventTypes.includes(search.event ?? "") ? search.event ?? "" : eventTypes.find(type => `${type}s`.toLowerCase() === search.event?.toLowerCase()) ?? "", template: templates.some(t => t.name === search.template) ? search.template ?? "" : "", eventName: "", hostName: "", eventDate: "", eventTime: "", venue: "", address: "", mapsUrl: "", dressCode: "", description: "", schedule: "", rsvpEnabled: true, deadline: "", fields: ["Full name", "Phone", "Email", "Number of guests"], plusOne: false, customQuestions: "", package: packages.some(p => p.name === search.package) ? search.package ?? "Signature" : "Signature", clientName: "", clientPhone: "", clientEmail: "" });
  const [files, setFiles] = useState<Record<FileGroup, File[]>>({ cover: [], gallery: [], logo: [], graphics: [], music: [] });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const update = (key: keyof Data, value: Data[keyof Data]) => setData(previous => ({ ...previous, [key]: value }));
  const input = (key: keyof Data, type = "text", placeholder = "") => <input className="field-control" type={type} value={data[key] as string} onChange={e => update(key, e.target.value)} placeholder={placeholder} required />;
  const textarea = (key: keyof Data, placeholder = "") => <textarea className="field-control min-h-28 resize-y" value={data[key] as string} onChange={e => update(key, e.target.value)} placeholder={placeholder} />;
  const toggleField = (name: string) => update("fields", data.fields.includes(name) ? data.fields.filter(x => x !== name) : [...data.fields, name]);

  function next() {
    if (step === 0 && !data.eventType) return setError("Choose an event type to continue.");
    if (step === 1 && !data.template) return setError("Choose a template to continue.");
    if (step === 2 && (!data.eventName || !data.hostName || !data.eventDate || !data.eventTime || !data.venue)) return setError("Complete all required event details to continue.");
    if (step === 5 && !data.package) return setError("Choose a package to continue.");
    setError(""); setStep(step + 1); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!data.clientName || !data.clientPhone || !data.clientEmail) return setError("Complete your contact details to send your request.");
    setSubmitting(true); setError("");
    try {
      const media: { name: string; type: string; data: string; category: FileGroup }[] = [];
      for (const category of Object.keys(files) as FileGroup[]) for (const file of files[category]) {
        if (file.size > 5_000_000) throw new Error(`${file.name} is too large. Please use files under 5 MB.`);
        const encoded = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(",")[1] ?? ""); reader.onerror = reject; reader.readAsDataURL(file); });
        media.push({ name: file.name, type: file.type, data: encoded, category });
      }
      await submitInvitation({ data: { eventType: data.eventType, template: data.template as "Editorial" | "Romance" | "Celebration", eventName: data.eventName, hostName: data.hostName, eventDate: data.eventDate, eventTime: data.eventTime, venue: data.venue, address: data.address, mapsUrl: data.mapsUrl, dressCode: data.dressCode, description: data.description, schedule: data.schedule, rsvp: { enabled: data.rsvpEnabled, deadline: data.deadline, fields: data.fields, plusOne: data.plusOne, customQuestions: data.customQuestions }, package: data.package as "Essential" | "Signature" | "Experience", clientName: data.clientName, clientPhone: data.clientPhone, clientEmail: data.clientEmail, media } });
      setCompleted(true); window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  }

  if (completed) return <main className="section-shell min-h-[65vh] py-24 text-center"><span className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-primary"><Check className="size-7"/></span><p className="eyebrow mt-8">REQUEST RECEIVED</p><h1 className="mt-4 font-display text-5xl text-primary md:text-6xl">Let the beautiful part begin.</h1><p className="mx-auto mt-6 max-w-lg text-base leading-8 text-muted-foreground">Thank you, {data.clientName}. Your invitation request has been received. The Evia team will review your details and contact you using the information you shared.</p><Button asChild className="mt-9"><Link to="/">Back to home <ArrowRight/></Link></Button></main>;

  return <main><section className="border-b border-border bg-surface"><div className="section-shell py-12 md:py-16"><p className="eyebrow">START SOMETHING SPECIAL</p><h1 className="mt-4 font-display text-4xl text-primary md:text-6xl">Create your invitation.</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">A few details about your day, and we’ll make them beautiful.</p></div></section>
    <div className="section-shell grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10 py-10 md:grid-cols-[210px_minmax(0,1fr)] md:gap-16 md:py-16">
      <aside className="min-w-0"><p className="editorial-label mb-5 text-muted-foreground">YOUR JOURNEY</p><ol className="flex gap-2 overflow-x-auto pb-3 md:flex-col md:overflow-visible">{stepNames.map((name, i) => <li key={name}><Button type="button" variant="ghost" onClick={() => { if (i < step) { setStep(i); setError(""); } }} disabled={i > step} className={`flex min-w-max justify-start gap-3 px-2 text-sm md:w-full ${step === i ? "bg-secondary text-primary" : "text-muted-foreground"}`}><span className={`flex size-6 items-center justify-center rounded-full border text-xs ${step === i ? "border-primary bg-primary text-primary-foreground" : i < step ? "border-gold text-gold" : "border-border"}`}>{i < step ? <Check className="size-3"/> : i + 1}</span>{name}</Button></li>)}</ol></aside>
      <form onSubmit={submit} className="min-w-0 max-w-3xl"><div className="mb-8 border-b border-border pb-7"><p className="eyebrow">STEP {String(step + 1).padStart(2, "0")} / 07</p><h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">{["What's the occasion?", "Choose a look you love.", "Tell us about the day.", "Make it personal.", "Plan your RSVPs.", "Choose your experience.", "How can we reach you?"][step]}</h2></div>
        {step === 0 && <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{eventTypes.map(type => <Button key={type} type="button" variant={data.eventType === type ? "default" : "outline"} onClick={() => update("eventType", type)} className="h-auto min-h-16 justify-between whitespace-normal px-5 py-4 text-left">{type}{data.eventType === type && <Check/>}</Button>)}</div>}
        {step === 1 && <div className="grid gap-4 sm:grid-cols-3">{templates.map(template => <Button key={template.name} type="button" variant="ghost" onClick={() => update("template", template.name)} className={`flex h-auto min-w-0 flex-col items-stretch overflow-hidden border p-0 text-left hover:bg-card ${data.template === template.name ? "border-gold ring-2 ring-gold/30" : "border-border"}`}><div className="relative aspect-[3/4] overflow-hidden"><img src={template.image} alt={`${template.name} style`} className="h-full w-full object-cover"/><span className="invitation-shade absolute inset-0"/><span className="absolute inset-x-3 bottom-5 text-center font-display text-2xl text-primary-foreground">{template.previewTitle}</span></div><span className="flex items-center justify-between px-4 py-4"><span><strong className="block font-display text-xl font-normal">{template.name}</strong><small className="mt-1 block whitespace-normal text-xs text-muted-foreground">{template.descriptor}</small></span>{data.template === template.name && <Check className="text-gold"/>}</span></Button>)}</div>}
        {step === 2 && <div className="grid gap-6 sm:grid-cols-2"><Field label="Event name" required>{input("eventName", "text", "e.g. Amara & David's Wedding")}</Field><Field label="Host / celebrant" required>{input("hostName", "text", "Name or names")}</Field><Field label="Date" required>{input("eventDate", "date")}</Field><Field label="Time" required>{input("eventTime", "time")}</Field><Field label="Venue" required>{input("venue", "text", "Venue name")}</Field><Field label="Address">{input("address", "text", "Street, city or area")}</Field><div className="sm:col-span-2"><Field label="Google Maps location link"><input className="field-control" type="url" value={data.mapsUrl} onChange={e => update("mapsUrl", e.target.value)} placeholder="https://maps.google.com/..." /></Field></div><Field label="Dress code">{input("dressCode", "text", "e.g. Garden formal")}</Field><div className="sm:col-span-2"><Field label="Event description">{textarea("description", "Tell your guests a little about the occasion")}</Field></div><div className="sm:col-span-2"><Field label="Event schedule">{textarea("schedule", "e.g. 3:00 PM Ceremony, 5:00 PM Reception")}</Field></div></div>}
        {step === 3 && <div className="grid gap-5 sm:grid-cols-2">{fileInputs.map(item => <label key={item.key} className="flex min-h-44 cursor-pointer flex-col items-center justify-center border border-dashed border-input bg-card p-5 text-center transition-colors hover:border-gold"><input type="file" accept={item.accept} multiple={item.multiple} className="sr-only" onChange={e => { const selected = Array.from(e.target.files ?? []); setFiles(previous => ({ ...previous, [item.key]: selected })); }}/>{item.key === "music" ? <Music2 className="size-6 text-gold"/> : item.key === "gallery" ? <ImagePlus className="size-6 text-gold"/> : <UploadCloud className="size-6 text-gold"/>}<span className="mt-3 text-sm font-semibold">{item.label}</span><span className="mt-1 text-xs leading-5 text-muted-foreground">{files[item.key].length ? files[item.key].map(f => f.name).join(", ") : item.hint}</span><span className="mt-3 text-[11px] text-muted-foreground">Up to 5 MB per file</span></label>)}<p className="text-xs leading-6 text-muted-foreground sm:col-span-2">Images and music are optional. You can share them with Evia later if you prefer.</p></div>}
        {step === 4 && <div className="space-y-8"><label className="flex items-center justify-between gap-4 border-b border-border pb-6"><span><strong className="block text-sm">Enable RSVP</strong><small className="mt-1 block text-muted-foreground">Collect responses directly from your invitation</small></span><input type="checkbox" checked={data.rsvpEnabled} onChange={e => update("rsvpEnabled", e.target.checked)} className="size-5 accent-primary" /></label>{data.rsvpEnabled && <><div className="max-w-sm"><Field label="RSVP deadline"><input type="date" className="field-control" value={data.deadline} onChange={e => update("deadline", e.target.value)} /></Field></div><div><p className="mb-4 text-sm font-semibold">What should guests share?</p><div className="grid gap-3 sm:grid-cols-2">{rsvpFields.map(field => <label key={field} className="flex items-center gap-3 border border-border bg-card p-4 text-sm"><input type="checkbox" checked={data.fields.includes(field)} onChange={() => toggleField(field)} className="size-4 accent-primary"/>{field}</label>)}</div></div><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={data.plusOne} onChange={e => update("plusOne", e.target.checked)} className="size-4 accent-primary"/>Allow plus-one responses</label><Field label="Custom RSVP questions">{textarea("customQuestions", "One question per line")}</Field></>}</div>}
        {step === 5 && <div className="space-y-3">{packages.map(item => <Button key={item.name} type="button" variant="ghost" onClick={() => update("package", item.name)} className={`flex h-auto w-full items-center justify-between gap-5 whitespace-normal border p-5 text-left hover:bg-card ${data.package === item.name ? "border-gold bg-secondary" : "border-border bg-card"}`}><span><span className="flex items-center gap-3 font-display text-2xl">{item.name}{item.popular && <span className="editorial-label bg-gold px-2 py-1 font-sans text-[9px] text-gold-foreground">MOST LOVED</span>}</span><span className="mt-1 block text-xs font-normal text-muted-foreground">{item.intro}</span></span><span className="shrink-0 text-sm font-semibold">{item.price}</span></Button>)}<p className="pt-2 text-xs leading-6 text-muted-foreground">Experience pricing for larger events is based on guest count and complexity.</p></div>}
        {step === 6 && <div className="grid gap-6 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Your name" required>{input("clientName", "text", "Full name")}</Field></div><Field label="Phone number" required>{input("clientPhone", "tel", "+254 ...")}</Field><Field label="Email address" required>{input("clientEmail", "email", "you@example.com")}</Field><p className="text-xs leading-6 text-muted-foreground sm:col-span-2">By sending this request, you’re asking Evia to contact you about your invitation. No payment is taken here.</p></div>}
        {error && <p role="alert" className="mt-7 border-l-2 border-destructive bg-secondary px-4 py-3 text-sm text-destructive">{error}</p>}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-7"><Button type="button" variant="ghost" disabled={step === 0 || submitting} onClick={() => { setStep(step - 1); setError(""); }}><ArrowLeft/> Back</Button>{step < 6 ? <Button type="button" size="lg" onClick={next}>Continue <ArrowRight/></Button> : <Button type="submit" size="lg" disabled={submitting}>{submitting ? "Sending…" : "Send request"} {!submitting && <ArrowRight/>}</Button>}</div>
      </form>
    </div>
  </main>;
}