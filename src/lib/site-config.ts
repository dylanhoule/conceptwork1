/**
 * Single source of truth for the demo brand.
 * Re-skinning this site for a real client = edit this file + tokens in globals.css.
 */
export const site = {
  name: "Summit Heating & Air",
  shortName: "Summit",
  legalLine: "Summit Heating & Air is a fictional company created as a design showcase.",
  tagline: "Comfort is one call away.",
  phoneDisplay: "(555) 555-0142",
  telHref: "tel:+15555550142",
  serviceArea: "Fairview & surrounding areas",
  since: 2003,
  hours: "Open 24/7 — nights, weekends, holidays",
  license: "License #HVAC-0000",
  credentials: ["Licensed & insured", "EPA 608 certified", "NATE certified"],
  rating: { stars: 4.9, count: "500+ five-star reviews" },
  studio: {
    name: "Concept Worked",
    credit: "Site by Concept Worked",
  },
} as const;

export type Site = typeof site;
