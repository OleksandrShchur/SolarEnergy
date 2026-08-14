# Solara

Marketing landing page for **Solara** — residential solar panel installation (Kyiv and region). Copy is mostly Ukrainian; the hero headline and day/night toggle are in English.

Stack: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide.

## Run locally

```bash
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview the production build |

## Where to change copy

All user-facing strings live in `src/content/site.ts`. Do not hardcode marketing copy in section components.

Brand name, nav, hero, calculator, pricing, FAQ, and CTAs are all exported from that file.

## Page structure

`src/App.tsx` wraps the page in `HeroThemeProvider` and renders sections in this order:

1. Navbar  
2. Hero (full-bleed morning/night images + toggle)  
3. TrustBar  
4. HowItWorks  
5. WhySolar  
6. SavingsCalculator (`#quote`)  
7. Technology  
8. Testimonials  
9. Pricing  
10. ServiceArea  
11. FAQ  
12. FinalCTA  
13. Footer  

## Hero day / night

Theme state is `morning` | `night` in `src/context/HeroThemeContext.tsx` (default: morning). Navbar and Hero consume it.

Images (keep the same crop so the facade does not jump):

- `public/assets/hero/morning.png`
- `public/assets/hero/night.png`

Hero uses a shared `object-position` (`50% 42%`) and a dissolve: night sits underneath, morning fades via opacity. Preload both images on mount. Honor `prefers-reduced-motion` (instant crossfade).

## Layout and UI primitives

| Piece | Path |
| --- | --- |
| Max-width wrapper | `src/components/layout/Container.tsx` |
| Section titles | `src/components/layout/SectionHeading.tsx` |
| Scroll-aware nav | `src/hooks/useScrolled.ts` |
| Fade-in on view | `src/components/ui/FadeIn.tsx` |
| Primary CTA | `src/components/ui/ContactButton.tsx` |
| Magnetic hover | `src/components/ui/Magnet.tsx` |

New sections: wrap in `Container`, use `SectionHeading`, give the `<section>` a stable `id` that matches `navLinks` / in-page anchors in `site.ts`.

## Design tokens

Defined in `tailwind.config.js` and CSS variables in `src/index.css`:

- Primary gold: `#F0A61F` (`primary`)
- Sunrise copper: `#E07B3A` (`secondary`)
- Warm ink: `#15120E` (`slate-ink`)
- Page background: `#F3EBDC` (`surface`)
- Cream (toggle pill / glass): `#F8F2E6`
- Headings: Sora (`font-heading`)
- Body: Inter (`font-sans`)
- Fluid type: `text-fluid-hero`, `text-fluid-section`

## Language and locale

- `index.html` `lang="uk"`
- Currency formatting: `uk-UA` (see `SavingsCalculator`)
- Keep Ukrainian for body sections unless the user asks to change language

## Agent skill

Project conventions for Cursor agents: `.cursor/skills/solara-landing/SKILL.md`.
