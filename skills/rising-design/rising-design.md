---
name: rising-design
description: Rising Company design system — mission control / technical HUD aesthetic. Apply these tokens, typography, component patterns, and voice/tone rules when building UI for Rising Company projects.
---

# Rising Company Design System

Apply this design system when building frontend/UI for Rising Company projects. The aesthetic is "mission control / technical HUD" — dark backgrounds, monospace system labels, mint-green accents, scanline textures, generous spacing.

Stack-agnostic: adapt these tokens and patterns to whatever framework the target project uses.

Full spec with component HTML/CSS: https://design-system.rising.company/llms.txt

## Fonts

```
Import: https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;500;700&display=swap
```

- **Display/Content:** "Rajdhani", sans-serif — weights 300, 500, 700
- **System/Technical:** "Share Tech Mono", monospace

**Font roles:** Share Tech Mono for HUD readouts (labels, stats, badges, eyebrows, footers, metadata). Rajdhani for human content (titles, descriptions, body text).

## Colors

**Backgrounds:** Base `#0a0c10` · Surface `#0d1117` · Surface Hover `#0f1520` · Inset `#0a1410`

**Borders:** Default `#1a2a20` · Hover `#2a4a38` · Subtle `#1a3020` · Grid `#111820`

**Text:** Heading `#e8f4ff` · Body `#c8d8e8` · Muted `#6a8a80` · Subtle `#4a6a5a` · Label `#3a5a50` · Dim `#2a3a30`

**Accents:** Primary (Mint) `#3af0a0` · Secondary (Blue) `#2a7adf` · Danger `#cc2200` · Warning `#ddaa30`

**Derivatives:** Primary@25% `#3af0a040` (corner brackets) · Primary@31% `#3af0a050` (tooltip borders) · Gradient `#3af0a0 → #2a7adf` (card hover bar)

## Text Styles

| Style | Family | Size | Weight | LS | Transform | Color |
|---|---|---|---|---|---|---|
| Eyebrow | Mono | 10px | — | 4px | upper | #3af0a0 |
| Page Title | Rajdhani | 36px | 700 | 3px | upper | #e8f4ff |
| Section Heading | Rajdhani | 28px | 700 | 2px | — | #e8f4ff |
| Card Title | Rajdhani | 20px | 700 | 1px | — | #e8f4ff |
| Body | Rajdhani | 13px | 400 | — | — | #6a8a80 |
| Stat Value | Mono | 16px | — | 1px | — | #3af0a0 |
| Subtitle | Mono | 11px | — | 2px | — | #4a6a5a |
| Section Label | Mono | 9px | — | 4px | upper | #3a5a50 |
| Badge | Mono | 9px | — | 1px | — | #3a5a50 |
| Footer | Mono | 9px | — | 2px | — | #2a3a30 |

## Spacing

Page `48px` · Section `32px` · Element `24px` · Grid `16px` · Inline `12px` · Tight `8px`

## Border Radius

Card `6px` · Tooltip `4px` · Badge `3px`

## Transitions

All: `0.2s` default easing. Properties: border-color, background, color, opacity.

## Required Visual Effects

**Scanlines** — fixed overlay on every page, `pointer-events: none`, `z-index: 100`:
```css
background: repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px);
```

**Corner brackets** — 32x32px L-shaped borders at viewport corners, `#3af0a040`, 16px from edges.

**Card hover gradient** — 2px bar at card top: `linear-gradient(90deg, #3af0a0, #2a7adf)`, `opacity: 0` default, `1` on hover.

## Branding: rising.company Backlink

Every Rising Company product (apps, demos, marketing pages) must include a subtle backlink to `https://rising.company`. The link should be minor — present for those looking for it, invisible to those who aren't.

**Rules:**
- Link target: `https://rising.company` · open in new tab (`target="_blank" rel="noopener noreferrer"`)
- Link text: `rising.company` (lowercase) — or wrap an existing "rising company" mention in the footer
- Style: footer mono token (Share Tech Mono · 9–10px · 2–4px letter-spacing · `#2a3a30` dim · uppercase if standalone)
- Hover: transition to mint `#3af0a0` over `0.2s`
- No underline. Inherit color when wrapped inside existing footer copy.

**Placement:**
- **Auth/login screens:** below the primary form, separated by element spacing (24–48px). Standalone link.
- **App layouts (with chrome):** in a footer or sidebar's bottom user section, right-aligned or below disconnect/logout.
- **Marketing/demo pages:** wrap the existing "rising company" mention inside the site footer with the anchor — preserves layout, just becomes interactive.

**Standalone (auth/app chrome):**
```html
<a href="https://rising.company" target="_blank" rel="noopener noreferrer"
   class="rising-backlink">rising.company</a>
```
```css
.rising-backlink {
  font-family: "Share Tech Mono", monospace;
  font-size: 10px;
  letter-spacing: 4px;
  color: #2a3a30;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.2s;
}
.rising-backlink:hover { color: #3af0a0; }
```

**Inline in footer copy:**
```html
<footer>// product-name &mdash;
  <a href="https://rising.company" target="_blank" rel="noopener noreferrer">rising company</a>
  &middot; tagline &middot; open source
</footer>
```
```css
footer a { color: inherit; text-decoration: none; transition: color 0.2s; }
footer a:hover { color: #3af0a0; }
```

## Voice & Tone

- `//` prefix on eyebrows, section labels, footers — signals system commentary
- Uppercase: eyebrows, section labels, page titles, stat labels
- Terse fragments over full sentences. Em dashes (—) over commas. Middle dot (·) as separator.
- No exclamation marks. No emoji. No casual language.

## Layout Principles

- Dark-first: 48px page margins, dark bg is a feature
- Sparse grids: `repeat(auto-fill, minmax(280px, 1fr))`, 16px gap
- Layered depth: Base → Surface → Surface Hover (no shadows)
- Subtle interaction: nothing bounces or jumps
- Scanlines always present

## Component Patterns

For detailed component HTML/CSS anatomy (card, badge, stats, tooltip, header, footer, HUD overlay, grid), read:
`skills/rising-design/components.md`
