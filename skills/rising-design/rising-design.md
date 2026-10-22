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

**Animation quality is the first priority of the design.** Handle every animation with care — design it before writing it, build it on [Motion](https://motion.dev), and if in doubt leave the element still. See "Motion" below.

Full spec: https://design-system.rising.company/llms.txt
Drop-in stylesheet: https://design-system.rising.company/rising.css

## Step 1: Pick the theme

**Do this before writing any UI.** The default theme is a product decision; the product may then opt in to `auto` and let the reader's OS setting decide.

| Use it for | Theme |
|---|---|
| Operator consoles, dashboards, diagram/map views, admin, internal tools, ambient displays | **Mission** |
| Landing/marketing pages, onboarding, sign-in for non-staff, forms, docs, bright rooms | **Daylight** |

Rules:

- **If a stranger sees it first, it's Daylight.** A cold visitor should not be met with a black screen and a bare input. Sign-in is the *end* of a landing page, not a substitute for one.
- If the user is logged in and doing operator work, it's Mission.
- A product may ship both — Daylight for the public surface, Mission for the app behind the login. **Switch at the auth boundary, not per-page.**
- **The reader's appearance setting may decide, if the product opts in:** `data-theme="auto"` on `<html>` follows the OS — Mission unless it asks for light, then Daylight. Pure CSS, no flash. A product that hasn't opted in keeps its theme.
- **Never override the person's choice.** A theme control has three states — System (`auto`), Mission, Daylight — is remembered per person and rendered on the server. Nothing switches theme on its own.

Apply with `data-theme` on the root element; `mission` is the default when absent:

```html
<html data-theme="daylight">
```

## Fonts

```
Import: https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Share+Tech+Mono&family=Rajdhani:wght@500;700&display=swap
```

Three faces, one job each:

- **`--font-display` — Rajdhani 700:** titles (hero, page, section, card) and the wordmark.
- **`--font-text` — IBM Plex Sans 400 / 500 / 600:** everything a person reads or presses — body, lede, help, errors, inputs, **buttons, nav links, menu items, field labels**.
- **`--font-mono` — Share Tech Mono:** readouts — eyebrows, section labels, stats, badges, tags, status, IDs, build stamps, footers.

**The test is what the words are for:** read as a sentence or pressed → IBM Plex Sans; reports system state → mono; names the page → Rajdhani. `body` is IBM Plex Sans, so a bare `<h1>` needs `.page-title` (or `--font-display`) to be Rajdhani. Unchanged across themes.

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
| `--border-subtle` | `#1a3020` | `#e6ede9` | faint rules · list row rules |
| `--border-grid` | `#111820` | `#e9efeb` | background structure |
| `--text-heading` | `#e8f4ff` | `#0b1a14` | page & card titles |
| `--text-body` | `#c8d8e8` | `#26332d` | primary body text |
| `--text-muted` | `#84a89a` | `#43564c` | descriptions · subtitles · nav links |
| `--text-dim` | `#6e8f80` | `#52655b` | labels · placeholders · footer chrome |
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
- **Four grays: heading, body, muted, dim.** `--text-subtle` and `--text-label` are retired — they still resolve, as aliases for `--text-muted` and `--text-dim`, so old code renders, but new code never names them. The lowest rung, `--text-dim`, sits at 5.5:1 because nearly everything on it is 12px Share Tech Mono — hairline stems that go grey on a 1× display, where contrast is the only thing buying them back.

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

**Texture sits behind the words.** Scanlines are `z-index: -1`, under every surface; nothing decorative paints over text.

**Do not port scanlines or brackets into Daylight.** The brand carries there through the Rajdhani titles, the mono labels, the `//` prefix, the mint and the spacing — not through darkness.

## Text Styles

**Seven sizes, nothing between them:** `--type-label` 12 · `--type-small` 14 · `--type-body` 16 · `--type-lead` 20 · `--type-section` 28 · `--type-page` 36 · `--type-hero` 56. Steps closer than that (15 / 16 / 17 / 18) read as mistakes, not levels.

| Style | Family | Size | Weight | LS | Transform | Color |
|---|---|---|---|---|---|---|
| Hero Title | Rajdhani | clamp(36–56px) | 700 | 2px | upper | `--text-heading` |
| Page Title | Rajdhani | 36px (28px < 768px) | 700 | 3px | upper | `--text-heading` |
| Section Heading | Rajdhani | 28px | 700 | 2px | — | `--text-heading` |
| Card Title | Rajdhani | 20px | 700 | 1px | — | `--text-heading` |
| Lede | IBM Plex Sans | 20px | 400 | — | — | `--text-muted` |
| Body | IBM Plex Sans | 16px | 400 | — | — | `--text-muted` |
| Button | IBM Plex Sans | 16px (14px sm) | 600 | — | sentence | per variant |
| Nav link · menu item · field label | IBM Plex Sans | 14px | 500 | — | sentence | `--text-muted` / `--text-body` |
| Help · error | IBM Plex Sans | 14px | 400 / 500 | — | — | `--text-muted` / `--danger-ink` |
| Stat Value | Mono | 20px (28px `.stat-lg` in a proof strip) | — | 0.06em | — | `--accent-ink` |
| Subtitle | Mono | 14px | — | 0.1em | — | `--text-muted` |
| Eyebrow | Mono | 12px | — | 0.2em | upper | `--accent-ink` |
| Section Label | Mono | 12px | — | 0.2em | upper | `--text-dim` |
| Badge | Mono | 12px | — | 0.05em | — | `--text-dim` |
| Footer | Mono | 12px | — | 0.1em | — | `--text-dim` |

**A control is never the smallest type on the page.** Buttons are 16px, like the body they act on; hierarchy comes from size and weight, not caps and tracking.

Line-height: headings `1.1` · button `1.25` · lede `1.5` · body `1.6` · mono metadata `1.5–1.9`.

**Every `font-size` ships in `rem`** (px ÷ 16 — 12px is `0.75rem`), through the `--type-*` tokens. Identical at the
default; it grows when the reader has asked for larger text. Widths that hold text grow too
(sidebar `min(16.25rem, 40vw)`), and at 200% things wrap rather than scroll sideways.

**Three rules hold the small sizes together, all for 1× displays:**

- **12px is the floor for Share Tech Mono — nothing smaller, ever.** Its stems are about
  7% of the em, so below 12px they sample to under one device pixel on a non-Retina
  monitor and turn to grey mush. The same text looks fine on a Retina laptop, which is
  exactly why the floor has to be a rule and not a judgement call.
- **Mono tracking is in `em`, not `px`.** Tracking that reads as HUD spacing at 12px reads
  as disconnected letters at 10px; `em` keeps the ratio fixed whatever the size. The
  widest rung is `0.2em` — resist going past it, because past roughly a quarter of an em
  the eye stops seeing words and starts seeing characters.
- **14px is the floor for IBM Plex Sans; reading text is 16px at 400.** Rajdhani never sets a paragraph.

**On phones (≤ 768px): wrap or stack, never shrink.** The page title is the one style that
changes: it steps down one rung to 28px, because 36px uppercase fits barely a dozen
characters on a 390px phone. The floors hold (body 16px, mono 12px, inputs 16px). A title that carries data gets
`min-width: 0; overflow-wrap: anywhere`. Actions beside a title wrap beneath it, toolbars
wrap, and column-style list rows stack (label with meta beneath, amount right, no header
row). Nothing scrolls the page sideways except the app nav row.

## Spacing

Page `48px` (24px < 768px) · Landing band `96px` (64px < 768px) · Section `32px` · Element `24px` · Grid `16px` · Inline `12px` · Tight `8px`

## Border Radius

Card `6px` · Control (buttons, inputs, tooltips) `4px` · Badge `3px`

## Motion

**Animation quality comes first.** Motion is the first thing a person feels on a screen and the first thing that reads as cheap when it is wrong. Before writing any animation, answer: what moves, why, how it enters, how it leaves, and what it does under reduced motion. No answer → no animation. **A still view beats a careless one.** Motion is identical in both themes.

**Library — Motion (motion.dev), required.** `npm i motion`. React: `import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "motion/react"`. Vanilla: `import { animate, stagger } from "motion"`. No hand-rolled `setTimeout` / `requestAnimationFrame` / class-toggle choreography, no second engine (GSAP, react-spring, anime.js). Plain CSS `transition` stays for hover, focus and color.

Wrap every React app root once:
```jsx
<MotionConfig reducedMotion="user" transition={{ type: "spring", visualDuration: 0.3, bounce: 0 }}>
```

**Scale** — pick from it, never invent a value:

| Tier | Value | Use |
|---|---|---|
| Quick | `0.2s ease` (CSS) · `{ duration: 0.2, ease: "easeOut" }` | hover, focus, color, border, opacity |
| Base | `{ type: "spring", visualDuration: 0.3, bounce: 0 }` | anything that moves or resizes: menus, panels, drawers, toasts, rows, layout |
| Slow | `{ type: "spring", visualDuration: 0.5, bounce: 0 }` · `0.6s ease` (CSS reveal) | whole surfaces: page reveal, route change, modal + scrim |
| Ambient | ≥ `2.4s ease-out` loop | the status pulse only |

- Springs move, tweens fade. Exits ≈ 0.6× the entry, fade-led, inside `AnimatePresence` — nothing pops out.
- `bounce: 0`, always. Nothing bounces, overshoots or wobbles.
- Stagger 40–90ms, whole sequence ≤ 600ms, batch past eight items.
- Distances are small: enter `y: 8 → 0`; menus/popovers `y: 4`, `scale: 0.98`, from their anchor. Never scale from 0; never slide from off-screen unless it's a drawer.

**Rules:**
1. Motion has a job — reveal, confirm, orient or connect. Can't name it → cut it.
2. Transform and opacity only. Never animate width/height/top/left/margin/padding/box-shadow/filter — use `layout` for size and position changes.
3. Never block input. Nothing runs longer than Slow except the status pulse.
4. One entrance per view — a revealing section does not also stagger its children.
5. Loops are for live state (the status dot; a skeleton breathing on opacity). Nothing else loops, shimmers or spins.
6. Reduced motion is a state, not a fallback: transforms off, opacity kept, content at final state. Verify with the OS setting on.
7. 60fps on a 1× machine — test with DevTools CPU throttle 4×; if it drops frames, simplify.
8. Review it in motion — entrance, exit, mid-flight interruption and reduced motion — before merging. A screenshot cannot approve an animation.

**Recipes:**
```jsx
// Panel / menu / toast
<AnimatePresence>
  {open && <motion.div initial={{ opacity: 0, y: 4, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }} style={{ transformOrigin: "top right" }} />}
</AnimatePresence>

// Staggered list (cap at 8)
<motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
  <motion.li variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} />
</motion.ul>

// Size / position change
<motion.div layout />
```
```js
// Vanilla
animate(".card", { opacity: [0, 1], y: [8, 0] }, { type: "spring", visualDuration: 0.3, bounce: 0, delay: stagger(0.06) })
```

**CSS transitions** — Quick tier on every control: `transition: background 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s;`. Properties: border-color, background, color, opacity, transform. Nothing else.

**Load reveal (optional)** — staggered boot-up: sections fade up in document order (opacity 0 → 1, translateY 8px → 0, 0.6s ease, 90ms stagger). CSS keyframes on a static page, `variants` + `staggerChildren: 0.09` in an app. One per page. Must respect `prefers-reduced-motion`.

**Reduced motion (required)** — keep the `rising.css` block alongside `MotionConfig reducedMotion="user"`:
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .btn:active:not([disabled]):not([aria-busy="true"]) { transform: none; opacity: 0.8; }
}
```

## Interaction States

**Focus ring (required)** — keyboard only, via `:focus-visible` (never plain `:focus`):
```css
:focus-visible { outline: 1px solid var(--accent-ink); outline-offset: 3px; border-radius: 2px; }
```

**Text selection (required):**
```css
::selection { background: var(--accent); color: var(--accent-on); }
```

**Disabled** — no new colors; reuse the low-emphasis ramp: text/icon `--text-dim`, border `--border-subtle`, background unchanged. `cursor: not-allowed`.

**Press (required)** — every button answers touch-down: `scale(0.97)` instantly, easing back at Quick on release (`whileTap={{ scale: 0.97 }}` in Motion); under reduced motion it dims to `opacity: 0.8`.

**Touch targets (required)** — `@media (pointer: coarse)` gives `.btn`, `.user-menu-trigger`, `.user-menu-item` and `.app-sidebar-nav a` `min-height: 44px`. Keyed on the pointer, not the width.

**Contrast preferences (required)** — `prefers-contrast: more` lifts the low text rungs to AAA (≥ 7:1), firms borders to 3:1 and turns off scanlines, glow and grid, in both themes, through the tokens. `forced-colors: active` drops the texture, borders every `.btn` in `ButtonText`, and keeps the status dot and active sidebar bar via `forced-color-adjust: none`. Values in `llms.txt` → "Contrast Preferences".

## Icons

**Lucide**, squared: `stroke-linecap: square; stroke-linejoin: miter`, 1.5px at every size (non-scaling stroke), `currentColor`. `.icon-sm` 16px beside 14px text · `.icon` 20px beside 16px · `.icon-lg` 24px for icon-only and the nav. Decorative → `aria-hidden="true"`; icon-only → `.btn-icon` (44px) with `aria-label` and a matching `title`. Sprite `branding/icons.svg` — copy it into the product. Never draw an icon with CSS borders or type it as a glyph (`←`, `+`). Anatomy in `components.md` → "Icon".

## Buttons

`btn` + one of `btn-primary` / `btn-secondary` / `btn-ghost` / `btn-danger`; sizes `btn-sm` (34px, 14px type) / default (44px, 16px) / `btn-lg` (52px, 16px); `btn-block` for full width. IBM Plex Sans 600, **sentence case written in the markup** — no `text-transform`.

- **`btn-primary`** (solid `--accent`) — the single loudest action on a view. A landing hero CTA, a form submit. One per screen.
- **`btn-secondary`** (`--accent-wash` + `--accent-line`) — the HUD default for in-app actions. A solid mint slab repeated is too loud inside Mission chrome.
- **`btn-ghost`** — everything else.
- **`btn-danger`** — the state recipe applied to `--danger-ink`; outline at rest, fills on hover.

## Form Fields

`field` wrapper → `field-label` → `input` → `field-help` or `field-error`. Add `is-error` to the wrapper for the error state.

- Field labels have no `//` — fields are items in a set; the prefix goes on the form's opening label (`// Sign in`), once.
- **Inputs use 16px text.** Anything smaller triggers zoom-on-focus in mobile Safari.
- Field labels are IBM Plex Sans 14px / 500 in `--text-body` — they name what to type, for a stranger. Errors are IBM Plex Sans 14px / 500 in `--danger-ink`.
- Placeholders use `--text-dim`, and never stand in for the label.
- Help and error copy are plain English sentences, not terse operator fragments.
- **Checkbox & radio** are native inputs tinted with `accent-color: var(--accent-ink)`, never redrawn. Each row is a `<label class="check">` (44px, 16px text face); a group is `<fieldset class="field">` + `<legend class="field-label">`. Radios: one of 2–5 (more → select). Checkbox: takes effect on submit. Anatomy in `components.md` → "Checkbox & Radio".
- **Switch** is for a setting that takes effect the moment it flips; if nothing happens until Save, use a checkbox. `<label class="setting"><span>Show weekends</span><input class="switch" type="checkbox" role="switch"></label>` — 40×24 with 4px corners, on moves the thumb and fills the track in `--accent-ink`. Anatomy in `components.md` → "Switch".
- **Segmented control** switches between 2–4 views of the same content (Day · Week · Month); if the URL changes, it's navigation. `.segmented` with `role="radiogroup"` and native radios inside labels, or `aria-pressed` buttons. 14px/500 muted; chosen = `--accent-wash` + `--accent-ink`. Anatomy in `components.md` → "Segmented Control".

## Table

For comparing values across rows; if each row is a thing you open, use `.list`. `.table-wrap` (a named, focusable region that scrolls sideways on its own) around `table.table`. Header: mono 12px caps, `--text-dim` on `--bg-inset`, sticky. Cells: 14px text face; numbers `.num` (right, `tabular-nums`); IDs `td.mono`. 44px rows on `--border-subtle` hairlines, no zebra, hover only on rows with a link. Sorting: `button.th-sort` + 16px icon, `aria-sort` on the one sorted `th`. Loading: `.skeleton`; empty: `.empty-state` in one cell. Anatomy in `components.md` → "Table".

## Toast

Confirms something the person just did, with an optional Undo — never something they must act on (that's the page, or a dialog). One at a time in `.toast-region`, bottom-right (bottom-centre on phones). Status icon + one 14px sentence + at most one `.btn-ghost.btn-sm`; no title. Success/info: `role="status"`, 5s, paused while pointer or focus is on it. Error: `role="alert"`, stays until dismissed. Focus never moves. Anatomy and JS recipe in `components.md` → "Toast".

## Page Patterns

### Landing page (Daylight)

A user-facing product needs a landing page before it needs a login box. Required order:

1. **Nav** — `.nav-brand` left (wordmark + the `.app-byline` `by rising.company`, the way home here too); links + one `btn-sm` CTA right. 64px, sticky, bottom border. Below 640px byline and links hide; no backlink among the links (the footer keeps its own).
2. **Hero** — eyebrow naming the product's job (`// Group scheduling`, not the parent brand — the byline says whose it is) → hero title → lede (one sentence, ≤ 90 chars) → action row (`btn-primary btn-lg` + `btn-ghost btn-lg`) → mono trust line. Max-width 720px centered.
3. **Proof strip** — one row of `.stat-value.stat-lg` figures (28px, larger than the lede: the number is the claim), or a single-line quote. Optional.
4. **How it works** — 3 numbered steps, reusing the `01 / 02 / 03` mono numerals.
5. **Feature grid** — 3 cards, `minmax(280px, 1fr)`.
6. **CTA band** — `--bg-inset`, full-bleed, section heading + one `btn-primary btn-lg`.
7. **Footer** — column links + the rising.company backlink.

96px between bands (64px below 768px). Every band shares one `max-width: 1080px; margin: 0 auto; padding-inline: 48px` inner container.

### Auth screen

**A bare centered form on an empty field is not an auth screen** — it gives a first-time visitor nothing to decide with.

- **Split** (default for user-facing products) — 50/50 above 900px, stacked below. Left: the pitch (eyebrow, product name, one-line lede, 3 mono checkpoints) on `--bg-inset`. Right: a surface card holding the form. **Pitch and form meet at the seam** — pitch content pushed right, card pushed left — so they read as one composition. Inside the card, sentences (helper text, "Got a link? Just open it") are the text face.
- **Centered** (staff/operator sign-in) — a single `max-width: 400px` surface card. Only when everyone signing in already knows what the product is.

Copy rules: say what the product does *before* asking for an address; name the mechanism ("we'll email you a link — no password"); never let the button be the only text on screen.

### App shell (both themes)

The chrome behind the auth boundary — the same three pieces in every signed-in Rising product:

1. **App bar** — 56px, sticky, `--bg-surface`, bottom border, full-bleed with the 48px gutter. Slots left→right: **brand** (favicon mark + product name as a 20px `.wordmark`, → product home), **byline** (`.app-byline` `by rising.company`, always — the link home, same tab; brand is never the way home), optional `· CONTEXT` for a real tenant/environment, **nav** (3–5 IBM Plex Sans 14px links in sentence case, current one `aria-current="page"` → `--text-heading` + 1px `--accent-ink` rule), **session** (right: `.status` dot + label, then the user menu — trigger = 24px initials chip + email + chevron; panel = `// Signed in as` + email, account items, **Sign out** last, ruled off, `--danger-ink` on hover). Status stays outside the menu; the exit is always "Sign out". No `// Rising` eyebrow, no CTA button.
2. **Page header** — one per view, inside `.app-main`: eyebrow → `.page-title` (+ actions right, same baseline) → `.subtitle`; 24px below, 32px margin, bottom border. Session controls never go here.
   **Content:** like items scanned top to bottom are a `.list` (one surface, hairline rows, whole row is the link, live state first in the meta) — not a card grid, which leaves a hole at any count that isn't a multiple of three.
3. **App footer** — `--bg-surface`, top border, `padding: 16px 48px`, mono `--text-dim` uppercase. Left `// PRODUCT · BUILD <date> · <sha>`; right ≤ 3 links + the rising.company backlink last. Pinned to the bottom by `.app { display:flex; flex-direction:column; min-height:100vh }`.

Chrome is surface, content is base. Both bars full-bleed (`.shell` goes *inside* `.app-main` if a view wants the 1080px column). Corner brackets stay off the shell. **Mobile, ≤ 768px — one form for every product:** two-row bar (brand + session, then the nav as a 44px touch row bleeding to the edges, scrolling sideways with a 24px edge fade, active rule on the bar's border), 24px gutters; below 640px byline, context and the trigger's email hide (chip stays), footer centers. Sidebar products (os, safe) keep a 260px `.app-sidebar` on desktop (`.app-sidebar-top` / `-nav` / `-bottom`, `<body class="app has-sidebar">`) and **below 768px hide it and render the ordinary `.app-bar.app-bar-mobile` + `.app-footer.app-footer-mobile`** — modules as the nav row, org switcher inside the user menu. No drawer. Worked example `patterns/app-shell-sidebar.html`.

Classes: `.app .has-sidebar .app-bar .app-bar-mobile .app-brand .app-byline .app-context .app-nav .app-sidebar .app-sidebar-top .app-sidebar-rule .app-sidebar-nav .app-sidebar-bottom .app-footer-mobile .app-session .status .user-menu .user-menu-trigger .user-initials .user-menu-email .user-menu-chevron .user-menu-panel .user-menu-head .user-menu-item .user-menu-signout .app-main .page-header .page-header-row .app-footer .app-footer-links`. Full anatomy in `components.md` → "App shell"; worked example `patterns/app-shell.html`.

### Empty state

Eyebrow → one-line explanation in `--text-muted` → one `btn-secondary`. Centered, max-width 420px, 96px vertical padding. Never a bare "No results."

## Brand Assets

Brand imagery lives at `https://design-system.rising.company/branding/` (repo: `branding/`). Reference or copy — never redraw the mark.

| File | Size | Use |
|---|---|---|
| `favicon.svg` | 64 viewBox, alpha | Preferred browser-tab icon |
| `favicon.png` / `favicon-xl.png` | 512 / 1024, alpha, rounded | Raster favicon, PWA manifest, OG thumbnails, store listings |
| `apple-icon.png` | 180×180, opaque, **square** | `apple-touch-icon` / Next.js `app/apple-icon.png` — iOS masks it; don't pre-round |
| `rising-logo-transparent.png` | 1200×497, alpha | Horizontal wordmark for **light** grounds (Daylight) |
| `rising-logo-dark.png` | 1200×497, alpha | Same wordmark for **dark** grounds (Mission) — light lettering, opaque arrow |
| `icons.svg` | 24×24 symbols | Lucide icons the system uses, squared by `.icon` — copy into the product (`tools/icons-sprite.py`) |
| `rising-logo-white.png` | 2026×898, white bg | Master the two are built from (`tools/logo-from-master.py`) — not for pages |

- Icons always use the dark `#0a0c10` base in both themes — the icon is not themed.
- Inside a product the app bar uses the favicon mark + the product's name in Rajdhani; the wordmark is for Rising's own surfaces.
- Clear space: the arrow's width on all sides. Minimum size: 16px icon / 120px-wide wordmark.

```html
<link rel="icon" type="image/svg+xml" href="https://design-system.rising.company/branding/favicon.svg">
<link rel="apple-touch-icon" sizes="180x180" href="https://design-system.rising.company/branding/apple-icon.png">
```

## Branding: rising.company Backlink

Every Rising Company product must include a subtle backlink to `https://rising.company`. Minor — present for those looking for it, invisible to those who aren't.

- Target `https://rising.company`, new tab (`target="_blank" rel="noopener noreferrer"`)
- Text `rising.company` (lowercase) — or wrap an existing "rising company" mention in the footer
- Style: Share Tech Mono · 12px · 0.1–0.2em letter-spacing · `--text-dim` · uppercase if standalone
- Hover: `--accent-ink` over `0.2s`. No underline.
- Placement: auth screens (below the form, 24–48px gap), app layouts (last link in `.app-footer`, or sidebar bottom near logout), landing/marketing (inline in the site footer copy)
- Signed-in products also carry the app-bar **byline** (`.app-byline`, `by rising.company` after the wordmark, same tab) — that is the way home; the footer link is the attribution. See "App shell".

```html
<a href="https://rising.company" target="_blank" rel="noopener noreferrer"
   class="rising-backlink">rising.company</a>
```

## Branding: Link Preview Card

Every Rising Company product ships a link preview card. A product travels by link, and the card is its first impression more often than the home page is — a bare rectangle or a wordmark on a colored field tells a reader nothing the URL did not.

**The card makes the product's argument out of the product's own data** — the chart, the grid, the ranking the page itself computes. If the product has a number, the number is on the card. Worked template: `patterns/og-card.html` → copy into the product as `tools/og.html`.

- **1200 × 630 CSS px, Daylight always** (a stranger sees it first), `--bg-surface`, 52px/64px padding
- Six parts: 6px left edge rule (`linear-gradient(180deg, var(--accent), var(--accent-2))`) · eyebrow `// product.rising.company` (mono 17px, `--accent-ink`) · headline (Rajdhani 700, 62px, decisive value in `--accent-ink`) · lede (25px, `--text-muted`, one plain sentence) · **evidence band** (the product's own object) · footer rule with legend left, stamp right
- **Reads at thumbnail size:** feeds render it ~350px wide. Headline ≥ 48px, lede ≥ 24px, mono ≥ 14px, no state distinguished only by a hairline or a wash
- **Shot at 2×** to 2400 × 1260, after `document.fonts.ready` — a card captured mid font-swap bakes fallback type into every share

```sh
agent-browser set viewport 1240 760 2
agent-browser open http://localhost:8000/tools/og.html
agent-browser wait --load networkidle
agent-browser screenshot "#og-card" og.png
```

Tags, all absolute: `canonical`, `og:type` `og:site_name` `og:url` `og:title` `og:description` `og:image` `og:image:width` `og:image:height` `og:image:alt`, `twitter:card=summary_large_image` `twitter:title` `twitter:description` `twitter:image`. `og:title` is the headline, not the page title. `og:image:alt` states the argument in words.

**`og:image` carries a `?v=YYYY-MM-DD` stamp** — scrapers cache by URL, so a regenerated card behind an unchanged URL serves stale numbers for days. Bump it in the commit that replaces the PNG, and pin the card's numbers and the stamp with a test so moving the data fails loudly. Next.js: `src/app/opengraph-image.tsx` with `ImageResponse` at 1200 × 630 — same six parts, framework handles the stamp.

Full spec: <https://design-system.rising.company/llms.txt> → "Link Preview Card (required branding)".

## Voice & Tone

Identical in both themes. Daylight is lighter in *value*, not in tone.

- `//` opens a region, once — the eyebrow over a title, the label over a group, the footer ident. Never on data (`OPEN · 5 REPLIES`), items in a set (card tags, list items, field labels), controls, or anything already framed. More than ~4 per viewport means some are decorating data.
- Uppercase: eyebrows, section labels, page/hero titles, stat labels, card tags, list meta
- Sentence case: buttons, nav links, field labels, card and list titles, body, descriptions, ledes, help text
- Terse technical fragments for chrome; **plain sentences for anything a stranger reads** — landing ledes, help text and error messages are written for humans, not operators
- Em dashes (—) over commas. Middle dot (·) as separator.
- No exclamation marks. No emoji. No casual language.

## Layout Principles

- **Theme-appropriate ground:** Mission's darkness is a feature; Daylight's white is a feature. Neither is empty space. 48px page margins in both.
- Sparse grids: `repeat(auto-fill, minmax(280px, 1fr))`, 16px gap
- Layered depth: Base → Surface → Surface Hover. Daylight adds one hairline shadow, never more.
- Motion is designed, not added — see "Motion". Springs with `bounce: 0`; nothing bounces or jumps
- Scanlines and brackets are Mission-only, and sit behind content
- A card's framing is one border and a hover bar. Tags are gray readouts, badges have no border — the title is what the eye finds first

## Component Patterns

For detailed component HTML/CSS anatomy (card, badge, list, stats, tooltip, header, footer, HUD overlay, grid, buttons, fields, landing, auth), read:
`skills/rising-design/components.md`
