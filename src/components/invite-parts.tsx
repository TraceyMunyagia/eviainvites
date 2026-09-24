import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { packages, templates } from "@/lib/invites";

export function SectionIntro({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return <div className="max-w-3xl"><p className="eyebrow">{kicker}</p><h2 className="mt-4 font-display text-4xl leading-[1.08] text-primary md:text-6xl">{title}</h2>{text && <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{text}</p>}</div>;
}

export function PageIntro({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <section className="border-b border-border bg-surface"><div className="section-shell py-16 md:py-24"><p className="eyebrow">{kicker}</p><h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.05] text-primary md:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{text}</p></div></section>;
}

export function FinalCta() {
  return <section className="bg-primary text-primary-foreground"><div className="section-shell py-20 text-center md:py-28"><p className="eyebrow">Let’s make it memorable</p><h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight md:text-6xl">The celebration begins with an invitation.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-primary-foreground/70">Tell us what you're dreaming up. We’ll take it from there.</p><Button variant="gold" size="lg" asChild className="mt-8"><Link to="/create">Create your invitation <ArrowRight /></Link></Button></div></section>;
}

export function TemplateGrid() {
  return <div className="grid gap-6 md:grid-cols-3">{templates.map(template => <article key={template.name} className="group min-w-0"><Link to="/templates" hash={template.name.toLowerCase()} className="relative block aspect-[4/5] overflow-hidden bg-surface"><img src={template.image} alt={`${template.name} invitation style`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><span className="invitation-shade absolute inset-0"/><div className="absolute inset-x-5 bottom-6 text-center text-primary-foreground"><p className="editorial-label text-gold">{template.previewName}</p><p className="mt-3 font-display text-4xl">{template.previewTitle}</p><p className="mt-5 text-[10px] uppercase tracking-[0.2em]">{template.previewDate}</p></div></Link><div className="mt-5 flex items-start justify-between gap-3"><div><h3 className="font-display text-3xl text-primary">{template.name}</h3><p className="mt-1 text-sm text-muted-foreground">{template.descriptor}</p></div><Button size="icon" variant="outline" asChild aria-label={`Explore ${template.name}`}><Link to="/templates" hash={template.name.toLowerCase()}><MoveUpRight /></Link></Button></div></article>)}</div>;
}

export function PackageGrid({ compact = false }: { compact?: boolean }) {
  return <div className="grid gap-5 lg:grid-cols-3">{packages.map(item => <article key={item.name} className={`relative flex flex-col border p-7 md:p-8 ${item.popular ? "border-gold bg-primary text-primary-foreground" : "border-border bg-card"}`}>
    {item.popular && <span className="editorial-label absolute right-5 top-5 bg-gold px-3 py-1.5 text-gold-foreground">MOST LOVED</span>}
    <p className={`eyebrow ${item.popular ? "text-gold" : ""}`}>{item.name}</p><h3 className="mt-5 font-display text-4xl">{item.price}</h3><p className={`mt-3 min-h-12 text-sm leading-6 ${item.popular ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{item.intro}</p>
    {!compact && <><div className={`my-7 h-px ${item.popular ? "bg-primary-foreground/20" : "bg-border"}`}/><ul className={`space-y-3 text-sm ${item.popular ? "text-primary-foreground/85" : "text-foreground"}`}>{item.features.map(feature => <li key={feature} className="flex gap-3 leading-6"><Check className="mt-1 size-4 shrink-0 text-gold"/>{feature}</li>)}</ul><p className={`mt-7 border-t pt-5 text-xs leading-6 ${item.popular ? "border-primary-foreground/20 text-primary-foreground/70" : "border-border text-muted-foreground"}`}><strong>Best for</strong> · {item.bestFor}</p></>}
    <Button variant={item.popular ? "gold" : "outline"} asChild className="mt-8 w-full"><Link to="/create" search={{ package: item.name }}>Choose {item.name} <ArrowRight /></Link></Button>
  </article>)}</div>;
}