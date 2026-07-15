# Concept Worked — HVAC Showpiece ("Summit Heating & Air")

## What this is

The flagship portfolio piece for **Concept Worked**, Dylan's freelance web studio. A complete, deployable website for a *fictional* local HVAC company, built to award-site quality.

Its real job is sales: when a local HVAC business owner sees it, they should think *"I want that — how much?"* Every decision below serves that reaction.

This is not a client project. The demo brand is deliberately swappable so the design can be re-skinned when a real company signs.

## The demo brand

- **Company:** Summit Heating & Air
- **Tagline:** "Comfort is one call away."
- **Service area:** Fairview & surrounding areas (placeholder — swap per pitch)
- **Phone:** (555) 555-0142 — unambiguously fictional
- **Character:** established (~"since 2003"), licensed & insured, 24/7 emergency service

## Two audiences, one site

1. **The homeowner (who the copy addresses):** their AC died in July or the furnace quit in January. They're stressed, on their phone, and want a human *now*. Copy is short, calm, confident: fix, fast, call.
2. **The HVAC owner (who the site is really for):** they're watching Dylan's pitch. The polish, motion, and speed *are* the product being sold.

When spectacle and clarity conflict, resolve in favor of the homeowner's clarity — a conversion machine that's *also* beautiful is the pitch.

## Pages

Two pages only. Depth is a non-goal; impact is the goal — most visitors never leave page one.

### Home — one long scroll

1. **Hero:** photoreal 3D heat-pump/AC unit, bold headline, giant tap-to-call button. Wow within 3 seconds.
2. **Scroll journey:** the unit rotates and explodes into components as you scroll; each component anchors a value prop — Cooling, Heating, Air Quality, 24/7 Emergency.
3. **Trust strip:** star rating, review pull-quotes, years in business, licensed & insured badges.
4. **Service area + final CTA:** "Talk to a tech now."

### About — the trust page

Story, team, certifications, reviews, service-area map, closing CTA.

### Persistent chrome

- Sticky call button visible at every scroll position, desktop and mobile.
- On mobile the entire funnel is one thumb: see hero → tap call.

## Conversion rules (non-negotiable)

- The phone number is visible at every viewport position.
- Every section ends in a call CTA.
- Click-to-call is the *only* primary action. No forms in the primary path.
- `tel:` links everywhere the number appears.

## Creative direction

- **Palette:** near-black base (#0A0C10 territory), glassy panels, two glows: cool blue (cooling) and warm amber (heating). The duality is the visual identity.
- **3D:** one hero asset — a photoreal-ish heat pump / AC unit (GLB), scroll-choreographed: rotate → explode → reassemble. Air rendered as light/particle streams.
- **Type:** oversized display headlines, tight and confident; clean grotesk body.
- **Motion bar:** 60fps or it doesn't ship. `prefers-reduced-motion` gets a static-but-gorgeous experience. Mobile gets a lighter scene or poster fallback — never lag.

## Stack

- Next.js (App Router) on Vercel
- React Three Fiber + drei for the 3D scene
- GSAP ScrollTrigger + Lenis for scroll choreography
- Tailwind CSS

## Success criteria

- A first-time visitor is visibly impressed within 3 seconds.
- Calling is never more than one tap/click away.
- Fast on a mid-range phone — lazy-load the 3D, poster first.
- Footer credit: "Site by Concept Worked" — the actual lead-gen hook.

## Non-goals

- No CMS, no blog, no SEO content play.
- No real booking backend — the phone is the funnel.
- No deep service pages. Two pages, maximum impact.
