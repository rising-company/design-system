# Rising Company Design System

One brand, two themes. Same type pairing, same spacing, same voice, same token names — only the palette and the amount of chrome change.

- **Mission** (dark) — mission control / technical HUD. Operator-facing surfaces: consoles, dashboards, diagram and map views, admin.
- **Daylight** (light) — the same system in daylight. User-facing surfaces: landing pages, marketing, onboarding, sign-in for people who aren't staff.

**Animation quality is the first priority of the design.** Motion is designed before it is written, built on [Motion](https://motion.dev), and a still view beats a careless one. See "Motion" below.

Live: <https://design-system.rising.company>

## What's here

- `index.html` — single-page visual reference with a live theme toggle. Renders every token (colors, type, controls, components, patterns) styled in the system itself.
- `rising.css` — drop-in token + component layer. Link it and set `data-theme`; that's the whole setup.
- `llms.txt` — the canonical spec, written for AI agents and humans. When in doubt, this file is the source of truth.
- `patterns/` — worked page patterns: `landing.html`, `auth-split.html` (Daylight), `auth-centered.html`, `app-shell.html` (Mission).
- `skills/rising-design/` — Claude skill that loads the spec into agent context.
- `branding/` — brand image assets (favicon, Apple touch icon, wordmark logos). See "Brand assets" in `llms.txt` for the file list, sizes and which one to use where.

## Picking a theme

It's a product decision, not a viewer preference.

| Use it for | Theme |
|---|---|
| Operator consoles, dashboards, diagram/map views, admin, ambient displays | **Mission** |
| Landing/marketing pages, onboarding, sign-in for non-staff, forms, docs, bright rooms | **Daylight** |

**If a stranger sees it first, it's Daylight.** A cold visitor should not be met with a black screen and a bare input — sign-in is the *end* of a landing page, not a substitute for one.

A product may ship both: Daylight for its public surface, Mission for the app behind the login. Switch at the auth boundary, not per-page.

## Using the system in another product

1. Import the fonts and the stylesheet, and declare a theme:

   ```html
   <html data-theme="daylight">
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;500;700&display=swap">
   <link rel="stylesheet" href="https://design-system.rising.company/rising.css">
   ```

   Or copy the `:root` / `[data-theme="daylight"]` blocks out of `rising.css` into your own build — every component reads from those variables and nothing else.

2. Read `llms.txt` for the full spec: tokens, text styles, spacing, controls, components, page patterns and voice rules.

3. Include the rising.company backlink — every product must link back. See the "Rising Company Backlink" section in `llms.txt`.

### Three traps

- **`--accent` is a fill, not an ink.** Mint `#3af0a0` is 1.4:1 on white. In Daylight use it as a button/badge *background* with `--accent-on` text; for accent text, icons and 1px borders use `--accent-ink` (which darkens to `#0b7a4e`).
- **Scanlines and corner brackets are Mission-only.** They're driven by `--chrome-scanline` and `--chrome-bracket-display`, so the same CSS rule goes inert in Daylight. Don't port the HUD texture across.
- **12px is the floor for Share Tech Mono, and mono tracking is in `em`.** Its stems are about 7% of the em, so below 12px they sample to under one device pixel on a 1× monitor and go grey — while looking perfectly crisp on the Retina laptop you designed on. Rajdhani body copy has a matching floor of 15px at weight 500. See "Two rules hold the mono scale together" in `llms.txt`.

## Motion

Motion is the first thing a person feels on a screen and the first thing that reads as cheap when it is wrong — so it is handled with more care than anything else in the system, not less. Before an animation is written, answer what moves, why, how it enters, how it leaves, and what it does under reduced motion. No answer → no animation.

- **One engine: [Motion](https://motion.dev)** (`npm i motion`; `motion/react` in React, `motion` elsewhere). No hand-rolled `setTimeout` / `requestAnimationFrame` choreography, no second library. Plain CSS `transition` stays for hover, focus and color.
- **One default:** `<MotionConfig reducedMotion="user" transition={{ type: "spring", visualDuration: 0.3, bounce: 0 }}>` at the app root. Springs move, tweens fade, `bounce: 0` always — nothing bounces.
- **One scale:** Quick 0.2s (hover, color) · Base spring 0.3 (menus, panels, layout) · Slow spring 0.5 / 0.6s reveal (whole surfaces) · Ambient ≥ 2.4s (the status pulse only). Exits faster than entries, inside `AnimatePresence`.
- **Transform and opacity only,** small distances (8px reveals, 4px menus), never block input, reduced motion verified with the OS setting on, 60fps at 4× CPU throttle, reviewed live before merging.

The full spec — scale, distances, eight rules, recipes — is the "Motion" section of `llms.txt`.

## Local preview

It's a static site — serve the directory so the relative `rising.css` and `patterns/` links resolve:

```sh
python3 -m http.server 8000
```

## Deployment

Vercel, served from the repo root (`vercel.json` sets `outputDirectory: "."`). Pushes to `main` deploy automatically.

## Voice

Terse technical fragments for chrome; plain sentences for anything a stranger reads. Em dashes over commas. Middle dot (·) as inline separator. No exclamation marks, no emoji. `//` prefix opens a region, once — the eyebrow, the label over a group, the footer ident — never on data, items in a set, or controls.
