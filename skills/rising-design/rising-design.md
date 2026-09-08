---
name: rising-design
description: Rising Company design system — two themes (Mission dark / Daylight light) over one token set. Apply these tokens, typography, component patterns, page patterns, and voice/tone rules when building UI for Rising Company projects.
---

# Rising Company Design System

Apply this design system when building frontend/UI for Rising Company projects.

**One brand, two themes.** Same type pairing, same spacing, same voice, same token names — only the palette and the amount of chrome change.

- **Mission** (dark) — mission control / technical HUD. Operator-facing surfaces.
- **Daylight** (light) — the same system in daylight. User-facing and public surfaces.

Stack-agnostic: adapt these tokens and patterns to whatever framework the target project uses.

Full spec: https://design-system.rising.company/llms.txt
Drop-in stylesheet: https://design-system.rising.company/rising.css

## Step 1: Pick the theme

**Do this before writing any UI.** It is a product decision, not a viewer preference.

| Use it for | Theme |
|---|---|
| Operator consoles, dashboards, diagram/map views, admin, internal tools, ambient displays | **Mission** |
| Landing/marketing pages, onboarding, sign-in for non-staff, forms, docs, bright rooms | **Daylight** |

Rules:

- **If a stranger sees it first, it's Daylight.** A cold visitor should not be met with a black screen and a bare input. Sign-in is the *end* of a landing page, not a substitute for one.
- If the user is logged in and doing operator work, it's Mission.
- A product may ship both — Daylight for the public surface, Mission for the app behind the login. **Switch at the auth boundary, not per-page.**
- A Daylight product may offer Mission as opt-in dark mode. A Mission product must not silently flip to Daylight.

Apply with `data-theme` on the root element; `mission` is the default when absent:

```html
<html data-theme="daylight">
```

## Fonts

```
Import: https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;500;700&display=swap
```

- **Display/Content:** "Rajdhani", sans-serif — weights 300, 500, 700
- **System/Technical:** "Share Tech Mono", monospace

**Font roles:** Share Tech Mono for HUD readouts (labels, stats, badges, eyebrows, buttons, footers, metadata). Rajdhani for human content (titles, descriptions, body). Unchanged across themes.

## Tokens

Reference the variable, never the literal hex. Both themes define the identical set.

| Token | Mission | Daylight | Use |
|---|---|---|---|
| `--bg-base` | `#0a0c10` | `#f6f8f7` | page background |
| `--bg-surface` | `#0d1117` | `#ffffff` | cards · panels |
| `--bg-surface-hover` | `#0f1520` | `#eef3f0` | interactive hover |
| `--bg-inset` | `#0a1410` | `#e8f5ee` | badges · recessed areas |
| `--border` | `#1a2a20` | `#dde5e0` | card borders · dividers |
| `--border-hover` | `#2a4a38` | `#9dc4b0` | card hover border |
| `--border-subtle` | `#1a3020` | `#e6ede9` | badge borders · faint rules |
| `--border-grid` | `#111820` | `#e9efeb` | background structure |
| `--text-heading` | `#e8f4ff` | `#0b1a14` | page & card titles |
| `--text-body` | `#c8d8e8` | `#26332d` | primary body text |
| `--text-muted` | `#84a89a` | `#43564c` | descriptions |
| `--text-subtle` | `#6a8a7a` | `#556b60` | subtitles · mono metadata |
| `--text-label` | `#4a6a5c` | `#5f766a` | section labels · placeholders |
| `--text-dim` | `#2a3a30` | `#8a9d94` | footer chrome — decorative only |
| `--accent` | `#3af0a0` | `#3af0a0` | brand **fill** (button/badge background) |
| `--accent-hover` | `#6ff7be` | `#22dc8c` | `--accent` under hover |
| `--accent-ink` | `#3af0a0` | `#0b7a4e` | accent as **text · icon · border** |
| `--accent-on` | `#08150f` | `#08150f` | text on top of `--accent` |
| `--accent-wash` | `#3af0a014` | `#0b7a4e12` | selected/active wash — @ 8% |
| `--accent-line` | `#3af0a050` | `#0b7a4e45` | accent border — @ 31% |
| `--accent-bracket` | `#3af0a040` | `#0b7a4e30` | corner brackets — @ 25% |
| `--accent-2-ink` | `#2a7adf` | `#1f5fbf` | secondary accent |
| `--danger-ink` | `#ff4a24` | `#c02a10` | error · destructive |
| `--warning-ink` | `#f5b83d` | `#8a5a00` | warning · caution |
| `--gradient` | mint → blue | green → blue | card hover bar |
| `--card-shadow` | `none` | `0 1px 2px rgba(11,26,20,0.04)` | Daylight elevation |

`--danger` / `--warning` / `--accent-2` also exist as full-strength fills, plus `-wash` and `-line` derivatives of each.

**Two traps:**

- **`--accent` is a fill, not an ink.** Mint `#3af0a0` is 1.4:1 on white. In Daylight use it as a *background* with `--accent-on` text. For accent text, icons and 1px borders use `--accent-ink`.
- **`--text-dim` is below AA in both themes on purpose.** Decorative de-emphasis for footer chrome and the backlink only. Never load-bearing, and never a form placeholder — use `--text-label`.

**State recipe** — any accent derives the same way, no extra tokens: background wash @8% · border @31% · text/icon at full ink strength.

## Theme-conditional chrome

| Effect | Mission | Daylight |
|---|---|---|
| Scanlines | required | off |
| Corner brackets | required on full-bleed HUD views | off |
| Atmosphere grid | on, mint glow | near-invisible |
| Elevation | background shift only | background shift + one hairline shadow |

Drive these from tokens so the same rule is inert in the other theme:
`--chrome-scanline`, `--chrome-bracket-display`, `--chrome-glow`, `--chrome-grid-line`.

**Do not port scanlines or brackets into Daylight.** The brand carries there through the mono labels, the `//` prefix, the mint and the spacing — not through darkness.

## Text Styles

| Style | Family | Size | Weight | LS | Transform | Color |
|---|---|---|---|---|---|---|
| Eyebrow | Mono | 10px | — | 4px | upper | `--accent-ink` |
| Hero Title | Rajdhani | clamp(36–56px) | 700 | 2px | upper | `--text-heading` |
| Page Title | Rajdhani | 36px | 700 | 3px | upper | `--text-heading` |
| Section Heading | Rajdhani | 28px | 700 | 2px | — | `--text-heading` |
| Card Title | Rajdhani | 20px | 700 | 1px | — | `--text-heading` |
| Lede | Rajdhani | 18px | 400 | — | — | `--text-muted` |
| Body | Rajdhani | 14px | 400 | — | — | `--text-muted` |
| Stat Value | Mono | 16px | — | 1px | — | `--accent-ink` |
| Subtitle | Mono | 12px | — | 2px | — | `--text-subtle` |
| Section Label | Mono | 10px | — | 4px | upper | `--text-label` |
| Button | Mono | 11px | — | 2px | upper | per variant |
| Badge | Mono | 10px | — | 1px | — | `--text-label` |
| Footer | Mono | 10px | — | 2px | — | `--text-dim` |

Line-height: headings `1.1` · lede `1.5` · body `1.55` · mono metadata `1.5–1.9`.

## Spacing

Page `48px` (24px < 768px) · Landing band `96px` (64px < 768px) · Section `32px` · Element `24px` · Grid `16px` · Inline `12px` · Tight `8px`

## Border Radius

Card `6px` · Control (buttons, inputs, tooltips) `4px` · Badge `3px`

## Transitions

All: `0.2s` default easing. Properties: border-color, background, color, opacity, transform.

## Interaction States

**Focus ring (required)** — keyboard only, via `:focus-visible` (never plain `:focus`):
```css
:focus-visible { outline: 1px solid var(--accent-ink); outline-offset: 3px; border-radius: 2px; }
```

**Text selection (required):**
```css
::selection { background: var(--accent); color: var(--accent-on); }
```

**Disabled** — no new colors; reuse the low-emphasis ramp: text/icon `--text-label`, border `--border-subtle`, background unchanged. `cursor: not-allowed`.

**Load reveal (optional)** — staggered boot-up: sections fade up in document order (opacity 0 → 1, translateY 8px → 0, 0.6s ease, 90ms stagger). Must respect `prefers-reduced-motion`.

## Buttons

`btn` + one of `btn-primary` / `btn-secondary` / `btn-ghost` / `btn-danger`; sizes `btn-sm` / `btn-lg`; `btn-block` for full width.

- **`btn-primary`** (solid `--accent`) — the single loudest action on a view. A landing hero CTA, a form submit. One per screen.
- **`btn-secondary`** (`--accent-wash` + `--accent-line`) — the HUD default for in-app actions. A solid mint slab repeated is too loud inside Mission chrome.
- **`btn-ghost`** — everything else.
- **`btn-danger`** — the state recipe applied to `--danger-ink`; outline at rest, fills on hover.

## Form Fields

`field` wrapper → `field-label` → `input` → `field-help` or `field-error`. Add `is-error` to the wrapper for the error state.

- Field labels carry the `//` prefix — they are system commentary, same as section labels: `// Email`.
- **Inputs use 16px text.** Anything smaller triggers zoom-on-focus in mobile Safari.
- Placeholders use `--text-label`, never `--text-dim`.
- Help and error copy are plain English sentences, not terse operator fragments.

## Page Patterns

### Landing page (Daylight)

A user-facing product needs a landing page before it needs a login box. Required order:

1. **Nav** — wordmark left; links + one `btn-sm` CTA right. 64px, sticky, bottom border.
2. **Hero** — eyebrow → hero title → lede (one sentence, ≤ 90 chars) → action row (`btn-primary btn-lg` + `btn-ghost btn-lg`) → mono trust line. Max-width 720px centered.
3. **Proof strip** — one row of mono stats, or a single-line quote. Optional.
4. **How it works** — 3 numbered steps, reusing the `01 / 02 / 03` mono numerals.
5. **Feature grid** — 3 cards, `minmax(280px, 1fr)`.
6. **CTA band** — `--bg-inset`, full-bleed, section heading + one `btn-primary btn-lg`.
7. **Footer** — column links + the rising.company backlink.

96px between bands (64px below 768px). Every band shares one `max-width: 1080px; margin: 0 auto; padding-inline: 48px` inner container.

### Auth screen

**A bare centered form on an empty field is not an auth screen** — it gives a first-time visitor nothing to decide with.

- **Split** (default for user-facing products) — 50/50 above 900px, stacked below. Left: the pitch (eyebrow, product name, one-line lede, 3 mono checkpoints) on `--bg-inset`. Right: a surface card holding the form.
- **Centered** (staff/operator sign-in) — a single `max-width: 400px` surface card. Only when everyone signing in already knows what the product is.

Copy rules: say what the product does *before* asking for an address; name the mechanism ("we'll email you a link — no password"); never let the button be the only text on screen.

### Empty state

Eyebrow → one-line explanation in `--text-muted` → one `btn-secondary`. Centered, max-width 420px, 96px vertical padding. Never a bare "No results."

## Branding: rising.company Backlink

Every Rising Company product must include a subtle backlink to `https://rising.company`. Minor — present for those looking for it, invisible to those who aren't.

- Target `https://rising.company`, new tab (`target="_blank" rel="noopener noreferrer"`)
- Text `rising.company` (lowercase) — or wrap an existing "rising company" mention in the footer
- Style: Share Tech Mono · 9–10px · 2–4px letter-spacing · `--text-dim` · uppercase if standalone
- Hover: `--accent-ink` over `0.2s`. No underline.
- Placement: auth screens (below the form, 24–48px gap), app layouts (footer or sidebar bottom near logout), landing/marketing (inline in the site footer copy)

```html
<a href="https://rising.company" target="_blank" rel="noopener noreferrer"
   class="rising-backlink">rising.company</a>
```

## Voice & Tone

Identical in both themes. Daylight is lighter in *value*, not in tone.

- `//` prefix on eyebrows, section labels, form labels, footers — signals system commentary
- Uppercase: eyebrows, section labels, page/hero titles, stat labels, buttons
- Normal case: card titles, body, descriptions, ledes, help text
- Terse technical fragments for chrome; **plain sentences for anything a stranger reads** — landing ledes, help text and error messages are written for humans, not operators
- Em dashes (—) over commas. Middle dot (·) as separator.
- No exclamation marks. No emoji. No casual language.

## Layout Principles

- **Theme-appropriate ground:** Mission's darkness is a feature; Daylight's white is a feature. Neither is empty space. 48px page margins in both.
- Sparse grids: `repeat(auto-fill, minmax(280px, 1fr))`, 16px gap
- Layered depth: Base → Surface → Surface Hover. Daylight adds one hairline shadow, never more.
- Subtle interaction: nothing bounces or jumps
- Scanlines and brackets are Mission-only

## Component Patterns

For detailed component HTML/CSS anatomy (card, badge, stats, tooltip, header, footer, HUD overlay, grid, buttons, fields, landing, auth), read:
`skills/rising-design/components.md`
