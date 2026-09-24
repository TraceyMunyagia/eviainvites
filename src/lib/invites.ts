import editorial from "@/assets/editorial-event.jpg";
import romance from "@/assets/romance-event.jpg";
import celebration from "@/assets/celebration-event.jpg";

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
  { name: "Essential", price: "KES 2,000", intro: "For moments shared with your closest people.", features: ["Digital invitation", "3 master template options", "Custom colours & fonts", "Event details & photos", "Hosted invitation page", "Personalized invitation URL", "RSVP form & tracking", "Countdown", "Google Maps", "Basic QR code", "1 revision"], bestFor: "Birthdays, baby showers, game nights, small graduations & casual events" },
  { name: "Signature", price: "KES 3,500", intro: "The complete invitation experience.", popular: true, features: ["Everything in Essential", "Advanced animations", "Multiple photo sections", "Background music", "Event schedule & dress code", "Custom RSVP questions", "Plus-one management", "Guest list management", "RSVP statistics", "Unique guest QR codes", "RSVP confirmation", "Guest list export", "2 revisions"], bestFor: "Weddings, graduations, birthdays, baby showers, bridal showers & corporate events" },
  { name: "Experience", price: "From KES 6,000", intro: "For a celebration with every detail considered.", features: ["Everything in Signature", "Fully customized design", "Advanced custom animations", "Multiple sections or pages", "QR event check-in", "Live check-in dashboard", "Guest management", "Dietary requirements", "Event itinerary", "Digital guestbook", "Advanced gallery", "Guest analytics", "Custom domain or subdomain", "Priority support", "3 revisions"], bestFor: "Luxury weddings, large graduations, corporate events, concerts, launches & large parties" },
];