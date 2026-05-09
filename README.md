# Rising Company Design System

Mission control / technical HUD aesthetic — dark backgrounds, monospace system labels, mint-green accents, scanline textures, generous spacing.

Live: <https://design-system.rising.company>

## What's here

- `index.html` — single-page visual reference. Renders every token (colors, type, spacing, components) styled in the system itself.
- `llms.txt` — the canonical spec, written for AI agents and humans. When in doubt, this file is the source of truth.
- `skills/rising-design/` — Claude skill that loads the spec into agent context.
- `favicon.svg` / `favicon.png` / `rising-logo-*.png` — brand assets.

## Local preview

It's a static site — open `index.html` directly, or serve the directory:

```sh
python3 -m http.server 8000
```

## Deployment

Vercel, served from the repo root (`vercel.json` sets `outputDirectory: "."`). Pushes to `main` deploy automatically.

## Using the system in another product

1. Read `llms.txt` — it covers fonts, color tokens, text styles, spacing, components, and voice rules.
2. Import the fonts:
   ```html
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;500;700&display=swap">
   ```
3. Apply the required globals: `#0a0c10` background, scanline overlay, 48px page padding.
4. Include the rising.company backlink — every product must link back. See the "Rising Company Backlink" section in `llms.txt` for placement and styling.

## Voice

Terse technical fragments. Em dashes over commas. Middle dot (·) as inline separator. No exclamation marks, no emoji. `//` prefix on system commentary (eyebrows, labels, footers).
