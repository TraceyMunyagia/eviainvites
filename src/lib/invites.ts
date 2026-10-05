import editorial from "@/assets/image1.png";
import romance from "@/assets/image2.png";
import celebration from "@/assets/image3.png";

export const eventTypes = ["Wedding", "Graduation", "Birthday", "Baby shower", "Bridal shower", "Engagement", "Corporate event", "Concert", "Game night", "Party", "Other event"];

export const templates = [
  { name: "Editorial", descriptor: "Sophisticated · Luxury · Minimal", image: editorial, events: "Weddings, engagements, corporate events", features: ["Refined typography", "Editorial photo layouts", "Elegant transitions"], previewName: "The celebration of", previewTitle: "Amara & David", previewDate: "SATURDAY · 12 DECEMBER 2026" },
  { name: "Romance", descriptor: "Elegant · Soft · Romantic", image: romance, events: "Weddings, bridal showers, baby showers", features: ["Soft floral details", "Romantic photo galleries", "Gentle animations"], previewName: "Together with their families", previewTitle: "Zara & James", previewDate: "SUNDAY · 14 FEBRUARY 2027" },
  { name: "Celebration", descriptor: "Bold · Modern · Fun", image: celebration, events: "Birthdays, graduations, parties, game nights", features: ["Playful layouts", "Bold color moments", "Animated details"], previewName: "You're invited to", previewTitle: "Nia's 30th", previewDate: "FRIDAY · 20 NOVEMBER 2026" },
] as const;

export const categories = [
  { icon: "💍", name: "Weddings", template: "Editorial · Romance" },
  { icon: "🎓", name: "Graduations", template: "Editorial · Celebration" },
  { icon: "🎂", name: "Birthdays", template: "Celebration · Romance" },
  { icon: "🍼", name: "Baby showers", template: "Romance · Celebration" },
  { icon: "💐", name: "Bridal showers", template: "Romance · Editorial" },
  { icon: "💍", name: "Engagements", template: "Editorial · Romance" },
  { icon: "🏢", name: "Corporate events", template: "Editorial · Celebration" },
  { icon: "🎵", name: "Concerts", template: "Celebration" },
  { icon: "🎮", name: "Game nights", template: "Celebration" },
  { icon: "🎉", name: "Parties", template: "Celebration · Romance" },
  { icon: "✦", name: "Other events", template: "Any template" },
];

export const steps = [
  { title: "Choose", body: "Pick your event type and a template that feels like you." },
  { title: "Submit", body: "Tell us the details, add your photos and set up your RSVP." },
  { title: "We design", body: "Our team personalizes your invitation in your chosen style." },
  { title: "Share", body: "Get your invitation link to share on WhatsApp or social media." },
  { title: "Track", body: "Keep up with responses and organize your guest list." },
  { title: "Check in", body: "Welcome guests with QR scanning on the Experience package." },
];

export const packages = [
  { name: "Essential", intro: "A clean, single-scroll invite for the details that matter.", features: ["Hero", "Message", "Details", "Dress Code", "Location", "Simple RSVP", "Closing"], bestFor: "Birthdays, baby showers, game nights, small graduations & casual events" },
  { name: "Signature", intro: "Adds the narrative and visual layer to your invitation.", popular: true, features: ["Everything in Essential", "Countdown", "Schedule", "Gallery", "RSVP customization: party size, custom questions, deadline"], bestFor: "Weddings, graduations, birthdays, baby showers, bridal showers & corporate events" },
  { name: "Experience", intro: "Adds the showcase and interactive layer for a richer guest experience.", features: ["Everything in Signature", "Video", "Guestbook", "QR guest passes + check-in (coming soon)"], bestFor: "Luxury weddings, large graduations, corporate events, concerts, launches & large parties" },
];
