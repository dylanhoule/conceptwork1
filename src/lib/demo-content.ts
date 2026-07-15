/**
 * Demo content for the fictional brand — reviews, team, stats, neighborhoods.
 * Re-skinning for a real client = swap this file + site-config.ts.
 */

export const reviews = [
  {
    quote: "Our AC died on the hottest Saturday of the year. Fixed by dinner.",
    name: "Maria G.",
    area: "Fairview Heights",
  },
  {
    quote: "Honest about what we didn't need. You don't forget that.",
    name: "Tom R.",
    area: "Cedar Flats",
  },
  {
    quote: "Furnace quit at 11 pm. A real person answered on the second ring.",
    name: "Priya S.",
    area: "Old Mill",
  },
  {
    quote: "New heat pump installed in a day, and they left the garage cleaner than they found it.",
    name: "Derek W.",
    area: "Riverbend",
  },
  {
    quote: "They tuned our system instead of selling us a new one. Three years running now.",
    name: "Alma C.",
    area: "North Summit",
  },
] as const;

export const stats = [
  { value: "23", label: "years on the job" },
  { value: "12,000+", label: "homes kept comfortable" },
  { value: "45 min", label: "average emergency response" },
] as const;

/* HIGGSFIELD_SLOT: team portraits — replace monogram avatars with AI photography */
export const team = [
  {
    name: "Ray Delgado",
    role: "Owner & master tech",
    line: "Started Summit with one van in 2003. Still takes the 2 am calls.",
  },
  {
    name: "Dana Whitfield",
    role: "Service manager",
    line: "Runs the board so a tech is at your door when we said they would be.",
  },
  {
    name: "Marcus Lee",
    role: "Lead installer",
    line: "Measures twice, installs once. Hates callbacks more than you do.",
  },
  {
    name: "Josie Tran",
    role: "Comfort advisor",
    line: "Explains your options in plain English — no pressure, no jargon.",
  },
] as const;

export const certifications = [
  { label: "Licensed & insured", detail: "Current, bonded, and happy to show proof." },
  { label: "EPA 608 certified", detail: "Refrigerant handled and recovered the right way." },
  { label: "NATE certified", detail: "Techs tested on real equipment, not just paper." },
  { label: "Background-checked", detail: "Every person we send to your door." },
] as const;

export const neighborhoods = [
  "Fairview Heights",
  "Cedar Flats",
  "Old Mill",
  "Riverbend",
  "North Summit",
  "Lakeside",
] as const;
