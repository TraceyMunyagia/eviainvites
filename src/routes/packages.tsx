import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, PackageGrid, PageIntro } from "@/components/invite-parts";
export const Route = createFileRoute("/packages")({ head: () => ({ meta: [
  { title: "Invitation Packages — Evia Invites" }, { name: "description", content: "Compare Essential, Signature and Experience invitation packages by features." }, { property: "og:title", content: "Invitation Packages — Evia Invites" }, { property: "og:description", content: "Choose the right invitation experience for your celebration." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: Packages });
function Packages() { return <><PageIntro kicker="THE PACKAGES" title="Every celebration has its own kind of magic." text="Choose the invitation experience that fits your occasion. Every invitation is personalized by Evia."/><section className="py-18 md:py-24"><div className="section-shell"><PackageGrid/></div></section><FinalCta/></> }
