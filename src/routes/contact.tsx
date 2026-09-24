import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Facebook, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/invite-parts";

const instagram = "https://www.instagram.com/eviainvites?stkn=OWk4ZHJvb21mYWg0";
const tiktok = "https://www.tiktok.com/@eviainvites?_r=1&_t=ZS-99zu7cZLzlt";
const facebook = "https://www.facebook.com/share/1HrzZvgC5S/?mibextid=wwXIfr";

function TikTokIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M14.7 3h3.05c.22 1.7 1.15 2.85 2.8 3.5v3.12c-1.32-.05-2.58-.48-3.62-1.22v7.02c0 3.2-2.23 5.58-5.43 5.58-2.73 0-4.9-1.92-4.9-4.48 0-2.82 2.42-4.7 5.35-4.7.38 0 .77.04 1.13.12v3.05a3.35 3.35 0 0 0-1.02-.17c-1.16 0-2.16.62-2.16 1.72 0 .87.71 1.48 1.7 1.48 1.3 0 2.1-.92 2.1-2.55V3Z" /></svg>;
}

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Evia Invites" }, { name: "description", content: "Get in touch with Evia Invites about your digital invitation." }] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Evia Invites enquiry from ${form.get("name")}`);
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`);
    window.location.href = `mailto:eviawke@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return <><PageIntro kicker="WE'D LOVE TO HEAR FROM YOU" title="Let’s talk about your moment." text="Have a question, a big idea, or a celebration on the horizon? Reach Evia directly and we’ll help you find the right way to bring it to life." /><main className="section-shell grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:py-24"><div><p className="eyebrow">GET IN TOUCH</p><h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Your celebration starts with a conversation.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Tell us what you’re planning and we’ll get back to you with thoughtful next steps.</p><div className="mt-9 space-y-5 text-sm"><a href="mailto:eviawke@gmail.com" className="flex items-center gap-4 hover:text-primary"><span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary"><Mail className="size-4" /></span><span><span className="block text-xs uppercase tracking-wider text-muted-foreground">Email</span><span className="font-semibold">eviawke@gmail.com</span></span></a><a href="tel:+254759976682" className="flex items-center gap-4 hover:text-primary"><span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary"><Phone className="size-4" /></span><span><span className="block text-xs uppercase tracking-wider text-muted-foreground">Phone</span><span className="font-semibold">+254 759 976 682</span></span></a><a href="https://wa.me/254759976682" target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-primary"><span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary"><MessageCircle className="size-4" /></span><span><span className="block text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</span><span className="font-semibold">Chat with Evia</span></span></a></div><div className="mt-10 flex gap-3"><a className="flex size-10 items-center justify-center border border-border text-primary hover:border-gold hover:text-gold" href={instagram} target="_blank" rel="noreferrer" aria-label="Evia Invites on Instagram"><Instagram className="size-4" /></a><a className="flex size-10 items-center justify-center border border-border text-primary hover:border-gold hover:text-gold" href={tiktok} target="_blank" rel="noreferrer" aria-label="Evia Invites on TikTok"><TikTokIcon className="size-4" /></a><a className="flex size-10 items-center justify-center border border-border text-primary hover:border-gold hover:text-gold" href={facebook} target="_blank" rel="noreferrer" aria-label="Evia Invites on Facebook"><Facebook className="size-4" /></a></div></div><form onSubmit={handleSubmit} className="border border-border bg-card p-6 md:p-9"><p className="editorial-label text-gold">SEND A NOTE</p><div className="mt-7 grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-semibold">Your name</span><input name="name" className="field-control" required /></label><label className="block"><span className="mb-2 block text-xs font-semibold">Email address</span><input name="email" type="email" className="field-control" required /></label><label className="block sm:col-span-2"><span className="mb-2 block text-xs font-semibold">How can we help?</span><textarea name="message" className="field-control min-h-40 resize-y" required placeholder="Tell us about your event or question..." /></label></div>{sent && <p className="mt-5 text-sm text-primary">Your email app should open with your message ready to send.</p>}<Button type="submit" size="lg" className="mt-7">Open email <ArrowUpRight /></Button></form></main></>;
}
