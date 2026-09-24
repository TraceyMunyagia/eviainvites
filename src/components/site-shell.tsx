import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Facebook, Instagram, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["/templates", "Templates"], ["/occasions", "Occasions"], ["/packages", "Packages"], ["/how-it-works", "How it works"], ["/contact", "Contact"],
] as const;

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/eviainvites?stkn=OWk4ZHJvb21mYWg0", icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@eviainvites?_r=1&_t=ZS-99zu7cZLzlt", icon: MusicNoteIcon },
  { label: "Facebook", href: "https://www.facebook.com/share/1HrzZvgC5S/?mibextid=wwXIfr", icon: Facebook },
] as const;

function MusicNoteIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>;
}

export function Brand({ light = false }: { light?: boolean }) {
  return <Link to="/" aria-label="Evia Invites home" className={`group inline-flex items-baseline gap-2 font-display text-[2rem] leading-none ${light ? "text-primary-foreground" : "text-primary"}`}><span className="tracking-[0.17em]">EVIA</span><span className={`font-sans text-[0.55rem] font-bold uppercase tracking-[0.22em] ${light ? "text-gold" : "text-muted-foreground"}`}>INVITES</span></Link>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
    <div className="section-shell flex h-[76px] items-center justify-between gap-4">
      <Brand />
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">{nav.map(([path, label]) => <Link key={path} to={path} activeProps={{ className: "text-primary" }} className="editorial-label text-muted-foreground transition-colors hover:text-primary">{label}</Link>)}</nav>
      <div className="flex items-center gap-3"><Button size="lg" asChild className="hidden sm:inline-flex"><Link to="/create">Create an invitation <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </div>
    {open && <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation"><div className="flex flex-col gap-1">{nav.map(([path, label]) => <Link key={path} to={path} onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium hover:bg-secondary">{label}</Link>)}<Button asChild className="mt-3 sm:hidden"><Link to="/create" onClick={() => setOpen(false)}>Create an invitation</Link></Button></div></nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="bg-primary text-primary-foreground"><div className="section-shell grid gap-12 py-16 md:grid-cols-[1.35fr_0.8fr_1.1fr] md:py-20"><div><Brand light /><p className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/70">For the moments worth gathering for. Thoughtfully designed digital invitations, made personal by Evia.</p><div className="mt-7 flex items-center gap-3"><p className="sr-only">Follow Evia Invites</p>{socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Follow Evia Invites on ${label}`} className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/80 transition-colors hover:border-gold hover:text-gold"><Icon className="size-4" /></a>)}</div></div><div><p className="editorial-label text-gold">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/75"><Link to="/templates" className="hover:text-gold">Templates</Link><Link to="/occasions" className="hover:text-gold">Occasions</Link><Link to="/packages" className="hover:text-gold">Packages</Link><Link to="/how-it-works" className="hover:text-gold">How it works</Link><Link to="/contact" className="hover:text-gold">Contact us</Link></div></div><div><p className="editorial-label text-gold">Your celebration starts here</p><p className="mt-5 text-sm leading-7 text-primary-foreground/75">A wedding, a birthday, or just because. We'd love to make it memorable.</p><div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/80"><a href="mailto:eviawke@gmail.com" className="inline-flex items-center gap-3 hover:text-gold"><Mail className="size-4 text-gold" />eviawke@gmail.com</a><a href="tel:+254759976682" className="inline-flex items-center gap-3 hover:text-gold"><Phone className="size-4 text-gold" />+254 759 976 682</a></div><Button variant="gold" asChild className="mt-6"><Link to="/create">Get started <ArrowUpRight /></Link></Button></div></div><div className="border-t border-primary-foreground/15"><div className="section-shell flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-primary-foreground/55"><span>© {new Date().getFullYear()} Evia Invites</span><span>Made for moments that matter.</span></div></div></footer>;
}
