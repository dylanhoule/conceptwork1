# Summit Heating & Air — Concept Worked flagship demo

A complete, deployable website for a **fictional** local HVAC company, built
to award-site quality. This is the portfolio piece for **Concept Worked** —
the demo brand is deliberately swappable so the design can be re-skinned when
a real company signs.

The creative brief and all product decisions live in
[`context/ABOUT.md`](context/ABOUT.md).

## The experience

- **Home** — one long scroll: a code-built 3D heat pump that rotates and
  explodes into components as you scroll, each part anchoring a value prop
  (Cooling / Heating / Air Quality / 24/7 Emergency), then a trust strip and
  service-area close.
- **About** — the trust page: story, team, certifications, reviews, map.
- **Conversion rules:** the phone number is visible at every scroll position,
  every section ends in a call CTA, and click-to-call is the only primary
  action. No forms.

Reduced-motion visitors get a fully static (but designed) experience; devices
without WebGL get a poster. See [`src/three/README.md`](src/three/README.md)
for the hero architecture and its swap seams (segmented GLB, scroll-scrubbed
video, AI-generated poster).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 ·
React Three Fiber 9 + drei · GSAP ScrollTrigger + Lenis · TypeScript

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Dev-only extras: `/dev/model` is a choreography lab (slider-scrubbed explode
timeline, quality toggle). It 404s in production builds.

## Re-skinning for a real client

1. `src/lib/site-config.ts` — name, phone, tagline, service area, license.
2. `src/lib/demo-content.ts` — reviews, team, stats, neighborhoods.
3. `src/app/globals.css` — the `@theme` brand tokens (palette + fonts).

Everything else derives from those three files.

## Deploying

Built for Vercel — connect the repo and deploy, or run `vercel` locally. Set
`NEXT_PUBLIC_SITE_URL` to the production URL so social cards resolve
correctly. (No CI or backend required; the phone is the funnel.)

---

Site by Concept Worked.
