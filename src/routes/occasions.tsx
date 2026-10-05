import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, FinalCta } from "@/components/invite-parts";
import { categories } from "@/lib/invites";
import birthday from "@/assets/15551561210913653.jpeg";
import graduation from "@/assets/258394097367390435.jpeg";
import bridalShower from "@/assets/Bridal Shower.jpeg";
import wedding from "@/assets/Elegant Wedding Details.jpeg";
import babyShower from "@/assets/Instagram.jpeg";
import concert from "@/assets/Lumineers concert 🎶.jpeg";
import engagement from "@/assets/_.jpeg";
import gamesNight from "@/assets/games night.jpeg";
import corporate from "@/assets/mulher ceo.jpeg";

const categoryImages: Record<string, string> = {
  Weddings: wedding,
  Graduations: graduation,
  Birthdays: birthday,
  "Baby showers": babyShower,
  "Bridal showers": bridalShower,
  Engagements: engagement,
  "Corporate events": corporate,
  Concerts: concert,
  "Game nights": gamesNight,
  Parties: gamesNight,
  "Other events": wedding,
};
export const Route = createFileRoute("/occasions")({ head: () => ({ meta: [
  { title: "Occasions & Events — Evia Invites" }, { name: "description", content: "Digital invitations for weddings, birthdays, graduations, baby showers, corporate events and more." }, { property: "og:title", content: "Occasions & Events — Evia Invites" }, { property: "og:description", content: "Whatever you're celebrating, find an invitation that feels like your occasion." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: Occasions });
function Occasions() { return <><PageIntro kicker="EVERY REASON TO GATHER" title="Every occasion deserves its own beginning." text="A beautiful invitation sets the tone before the first guest arrives."/><section className="py-18 md:py-24"><div className="section-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{categories.map(category => <Link key={category.name} to="/create" search={{ event: category.name }} className="group relative min-h-72 overflow-hidden bg-primary"><img src={categoryImages[category.name]} alt={`${category.name} invitation`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/><span className="invitation-shade absolute inset-0"/><div className="absolute inset-x-6 bottom-6 text-primary-foreground"><span className="text-2xl" aria-hidden>{category.icon}</span><div className="mt-2 flex items-end justify-between gap-3"><div><h2 className="font-display text-3xl">{category.name}</h2><p className="mt-1 text-xs text-primary-foreground/80">{category.template}</p></div><ArrowUpRight className="size-5"/></div></div></Link>)}</div></section><FinalCta/></> }
