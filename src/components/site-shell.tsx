import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["/templates", "Templates"], ["/occasions", "Occasions"], ["/packages", "Packages"], ["/how-it-works", "How it works"],
] as const;

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
  return <footer className="bg-primary text-primary-foreground"><div className="section-shell grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:py-20"><div><Brand light /><p className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/70">For the moments worth gathering for. Thoughtfully designed digital invitations, made personal by Evia.</p></div><div><p className="editorial-label text-gold">Explore</p><div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/75"><Link to="/templates" className="hover:text-gold">Templates</Link><Link to="/occasions" className="hover:text-gold">Occasions</Link><Link to="/packages" className="hover:text-gold">Packages</Link><Link to="/how-it-works" className="hover:text-gold">How it works</Link></div></div><div><p className="editorial-label text-gold">Your celebration starts here</p><p className="mt-5 text-sm leading-7 text-primary-foreground/75">A wedding, a birthday, or just because. We'd love to make it memorable.</p><Button variant="gold" asChild className="mt-5"><Link to="/create">Get started <ArrowUpRight /></Link></Button></div></div><div className="border-t border-primary-foreground/15"><div className="section-shell flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-primary-foreground/55"><span>© {new Date().getFullYear()} Evia Invites</span><span>Made for moments that matter.</span></div></div></footer>;
}