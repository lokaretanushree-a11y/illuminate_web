/**
 * Event Configuration
 * Easily update pricing, dates, contact details, and links here.
 */

export const EVENT_CONFIG = {
  name: "ILLUMINATE",
  type: "Workshop",
  collaboration: {
    primary: "E-Cell IIT Bombay",
    host: "E-Cell LTCE",
    label: "E-Cell IIT Bombay × E-Cell LTCE",
  },
  tagline: "Got an idea? Let's illuminate it.",
  date: {
    display: "Monday, 12 October 2026",
    shortDisplay: "12 OCTOBER 2026",
    day: "12",
    month: "OCT",
    year: "2026",
    isoDate: "2026-10-12",
  },
  time: {
    display: "4–5 Hours",
    start: "",
    end: "",
    duration: "4–5 Hours of Immersive Learning",
  },
  venue: {
    name: "LOKMANYA TILAK COLLEGE OF ENGINEERING (LTCE), NAVI MUMBAI",
    shortName: "LTCE, NAVI MUMBAI",
    address: "Lokmanya Tilak College of Engineering, Sector 4, Vikas Nagar, Koparkhairane, Navi Mumbai, Maharashtra 400709",
    area: "Navi Mumbai",
    landmark: "Sector 4, Koparkhairane, Navi Mumbai",
    googleMapsUrl: "https://maps.google.com/?q=Lokmanya+Tilak+College+of+Engineering+Navi+Mumbai",
  },
  pricing: {
    // Easily configurable registration fee
    amount: 700,
    currencySymbol: "₹",
    label: "per participant",
    passType: "All-Access Workshop Pass",
  },
  contacts: [
    {
      name: "Pari Tiwari",
      phone: "+91 95801 96336",
    },
    {
      name: "Awasthi Raghwendra",
      phone: "+91 88791 82418",
    },
  ],
  socials: {
    instagramLtce: "https://www.instagram.com/ltce_ecell?stkn=dXEzYWJ4d2o0Z3Fn",
    instagramIitb: "https://www.instagram.com/iitbombay_ecell/?hl=en",
    linkedinLtce: "https://www.linkedin.com/company/ecell-ltce/",
    ecellIitb: "https://ecell.in",
    ecellLtce: "https://ltce.in",
  },
  links: {
    luma: "https://lu.ma/illuminate-ltce-2026",
    googleForm: "https://forms.gle/XJMwB8mSd4GzBn9G7",
  },
  videoPath: "/assets/illuminate-hero.mp4",
};
