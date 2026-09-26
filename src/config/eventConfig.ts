/**
 * Event Configuration
 * Easily update pricing, dates, contact details, and links here.
 */

export const EVENT_CONFIG = {
  name: "ILLUMINATE",
  type: "Workshop",
  collaboration: {
    primary: "E-Cell IIT Bombay",
    host: "E-Cell CRCE",
    label: "E-Cell IIT Bombay × E-Cell CRCE",
  },
  tagline: "Got an idea? Let's illuminate it.",
  date: {
    display: "Saturday, 3 October 2026",
    shortDisplay: "03 OCTOBER 2026",
    day: "03",
    month: "OCT",
    year: "2026",
    isoDate: "2026-10-03T11:00:00+05:30",
  },
  time: {
    display: "11:00 AM – 6:00 PM",
    start: "11:00 AM",
    end: "6:00 PM",
    duration: "7 Hours of Immersive Learning",
  },
  venue: {
    name: "Fr. Conceicao Rodrigues College of Engineering",
    shortName: "Fr. CRCE, Bandra",
    address: "Fr. Agnel Ashram, Bandstand Promenade, W, Bandra West, Mumbai, Maharashtra 400050, India",
    area: "Bandra West, Mumbai",
    landmark: "Bandstand Promenade, Overlooking the Arabian Sea",
    googleMapsUrl: "https://maps.google.com/?q=Fr.+Conceicao+Rodrigues+College+of+Engineering+Bandstand+Bandra+West+Mumbai",
  },
  pricing: {
    // Easily configurable registration fee
    amount: 349,
    currencySymbol: "₹",
    label: "per participant",
    passType: "All-Access Workshop Pass",
  },
  contacts: [
    {
      name: "Pari Tiwari",
    },
    {
      name: "Awasthi Raghwendra",
    },
  ],
  socials: {
    instagram: "https://instagram.com/ecell_crce",
    ecellIitb: "https://ecell.in",
    ecellCrce: "https://crce.ac.in",
  },
  links: {
    luma: "https://lu.ma/illuminate-crce-2026",
    googleForm: "https://forms.gle/illuminate-crce-2026",
  },
  videoPath: "/assets/illuminate-hero.mp4",
};
