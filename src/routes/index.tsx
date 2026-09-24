import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MoveDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinalCta, PackageGrid, SectionIntro, TemplateGrid } from "@/components/invite-parts";
import { categories, steps } from "@/lib/invites";
import hero from "@/assets/hero-wedding.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Evia Invites — Digital Invitations for Moments That Matter" },
    { name: "description", content: "Beautiful interactive digital invitations, RSVP tracking and guest management for weddings, birthdays and every celebration." },
    { property: "og:title", content: "Evia Invites — Digital Invitations for Moments That Matter" },
    { property: "og:description", content: "Beautiful interactive digital invitations, RSVP tracking and guest management for every celebration." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Home,
});

function Home() {
  return <>
    <section className="relative flex min-h-[620px] items-center overflow-hidden bg-primary text-primary-foreground lg:min-h-[690px]"><img src={hero} alt="An elegant garden celebration set with flowers and candles" width={1600} height={1056} className="absolute inset-0 h-full w-full object-cover object-center"/><div className="hero-shade absolute inset-0"/><div className="section-shell relative z-10 py-24 md:py-28"><div className="reveal max-w-[690px]"><p className="editorial-label text-gold">EVIA INVITES · CELEBRATE BEAUTIFULLY</p><h1 className="mt-7 max-w-[670px] font-display text-5xl leading-[1.06] sm:text-6xl lg:text-7xl">Digital Invitations for Moments That Matter</h1><p className="mt-7 max-w-lg text-base leading-8 text-primary-foreground/85 md:text-lg">Create beautiful, interactive invitations with RSVP tracking and guest management.</p><div className="mt-9 flex flex-wrap gap-3"><Button variant="gold" size="lg" asChild><Link to="/create">Create Your Invitation <ArrowUpRight /></Link></Button><Button variant="cream" size="lg" asChild><Link to="/templates">Explore Templates <ArrowRight /></Link></Button></div></div></div><Link to="/templates" className="absolute bottom-6 right-6 hidden items-center gap-2 text-xs text-primary-foreground/80 md:flex">Discover the collection <MoveDownRight className="size-4" /></Link></section>
    <section className="border-b border-border bg-background py-16 md:py-24"><div className="section-shell"><div className="mb-10 flex flex-wrap items-end justify-between gap-6"><SectionIntro kicker="THE COLLECTION" title="An invitation as unique as the moment." text="Three considered design directions, made entirely yours."/><Button variant="outline" asChild><Link to="/templates">View all templates <ArrowRight /></Link></Button></div><TemplateGrid /></div></section>
    <section className="bg-surface py-18 md:py-24"><div className="section-shell"><SectionIntro kicker="EVERY REASON TO GATHER" title="What are we celebrating?" text="From intimate gatherings to once-in-a-lifetime occasions, every event deserves a beautiful beginning."/><div className="mt-12 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">{categories.map(category => <Link key={category.name} to="/create" search={{ event: category.name }} className="group flex min-h-40 flex-col justify-between border-r border-b border-border bg-background p-5 transition-colors hover:bg-secondary"><span className="text-2xl" aria-hidden>{category.icon}</span><div><span className="font-display text-xl text-primary">{category.name}</span><span className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">{category.template}<ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></div></Link>)}</div></div></section>
    <section className="py-20 md:py-28"><div className="section-shell"><div className="mb-12 flex flex-wrap items-end justify-between gap-6"><SectionIntro kicker="THE PROCESS" title="Beautifully simple, from start to celebration."/><Button variant="outline" asChild><Link to="/how-it-works">See how it works <ArrowRight /></Link></Button></div><div className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">{steps.map((step, i) => <article key={step.title} className="min-h-52 border-r border-b border-border p-7"><span className="editorial-label text-gold">0{i + 1}</span><h3 className="mt-8 font-display text-3xl text-primary">{step.title}</h3><p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">{step.body}</p></article>)}</div></div></section>
    <section className="bg-surface py-20 md:py-28"><div className="section-shell"><div className="mb-10 flex flex-wrap items-end justify-between gap-6"><SectionIntro kicker="THE PACKAGES" title="A little more magic, at every level."/><Button variant="outline" asChild><Link to="/packages">Compare packages <ArrowRight /></Link></Button></div><PackageGrid compact /></div></section>
    <FinalCta />
  </>;
}