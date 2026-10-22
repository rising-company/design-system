# Component Reference

Detailed HTML/CSS anatomy for every component pattern. Extract the exact CSS values from this file when building components.

All values below reference theme variables (`var(--token)`). Both themes — **Mission** (dark, default) and **Daylight** (light) — define the identical token set, so every component here is written once and works in either. Set `data-theme="mission"` or `data-theme="daylight"` on the root element; see `rising-design.md` for the token values and for how to choose.

Faces are tokens too: `--font-display` (Rajdhani — titles, wordmark), `--font-text` (IBM Plex Sans — body and every control) and `--font-mono` (Share Tech Mono — readouts). `body` is IBM Plex Sans, so a title names its face. Sizes come from the seven-step scale in `rising-design.md` → "Text Styles".

The whole layer is also published as a drop-in stylesheet:
`<link rel="stylesheet" href="https://design-system.rising.company/rising.css">`

---

## Icon

Lucide, with square caps and mitred joins, a 1.5px stroke that doesn't scale, and `currentColor`.
Sprite: `branding/icons.svg` (copy it into the product; `<use>` won't cross origins). Any other
Lucide icon, or `lucide-react`, takes the same class. Rules and the full list: `llms.txt` → "Icon".

```html
<svg class="icon" aria-hidden="true"><use href="/icons.svg#check"/></svg>
<button class="btn btn-ghost btn-icon" aria-label="Copy link" title="Copy link">
  <svg class="icon" aria-hidden="true"><use href="/icons.svg#copy"/></svg>
</button>
```

```css
.icon {
  width: 1.25em; height: 1.25em; flex: none; vertical-align: -0.25em;   /* 20px beside 16px text */
  fill: none; stroke: currentColor; stroke-width: 1.5px;
  stroke-linecap: square; stroke-linejoin: miter;
}
.icon * { vector-effect: non-scaling-stroke; }
.icon-sm { width: 1rem; height: 1rem; }       /* beside 14px text */
.icon-lg { width: 1.5rem; height: 1.5rem; }   /* icon-only buttons, the nav */
.btn-icon { width: 2.75rem; height: 2.75rem; padding: 0; gap: 0; }   /* needs aria-label */
```

---

## Card

A clickable container with eyebrow tag, title, description, badge row, and arrow indicator. Use for navigation links to pages, diagrams, or sections. Features a gradient top-border that appears on hover.

This is the full anchor-card recipe: it layers `display: block` / `text-decoration: none` and its own internal margins on top of the base `.card` in `rising.css`. Those additions are deliberate — the base class stays margin-free so it composes in other contexts (auth panels, feature grids). Use the base class when you want to control spacing yourself.

### HTML

```html
<a class="card" href="#">
  <div class="card-tag">Category · Subcategory</div>
  <div class="card-title">Card Title</div>
  <div class="card-desc">
    Brief description of what this card links to or represents.
  </div>
  <div class="card-meta">
    <span class="badge">Tag 1</span>
    <span class="badge">Tag 2</span>
    <span class="badge">Tag 3</span>
  </div>
  <div class="card-arrow"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons.svg#arrow-right"/></svg></div>
</a>
```

### CSS

```css
.card {
  display: block;
  text-decoration: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: var(--card-shadow);
  padding: 24px;
  background: var(--bg-surface);
  transition: border-color 0.2s, background 0.2s;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient);
  opacity: 0;
  transition: opacity 0.2s;
}

.card:hover {
  border-color: var(--border-hover);
  background: var(--bg-surface-hover);
}

.card:hover::before {
  opacity: 1;
}

.card-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--text-dim);      /* a gray readout: the title is seen first */
  text-transform: uppercase;
  margin-bottom: 10px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-heading);
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin-bottom: 16px;
}

.card-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.card-arrow {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  color: var(--border-hover);
  transition: color 0.2s;
}

.card:hover .card-arrow {
  color: var(--accent-ink);
}
```

---

## Badge

Small mono-text label used for metadata tags. Use inside `.card-meta` to display compact attributes, categories, or specs.

### HTML

```html
<span class="badge">Label</span>
```

### CSS

```css
.badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--text-dim);
  background: var(--bg-inset);  /* no border: the fill groups the word */
  border-radius: 3px;
  padding: 4px 8px;
}
```

---

## List

Rows of like things — a person's huddles, invoices, runs. One surface, a hairline between rows, the whole row is the link. Use it instead of a card grid whenever the items share a shape and the person scans them top to bottom: a list fills the width at any count, where three cards leave a hole.

### HTML

```html
<ul class="list" aria-label="Open huddles">
  <li>
    <a class="list-row" href="/h/q4">
      <div class="list-main">
        <div class="list-title">Q4 planning offsite</div>
        <p class="list-desc">Three days proposed. Two people still to answer.</p>
      </div>
      <div class="list-meta"><span class="is-live">Open</span><span>5 replies</span><span>Oct 6–8</span></div>
    </a>
  </li>
</ul>
```

### CSS

```css
.list {
  list-style: none; margin: 0; padding: 0;
  background: var(--bg-surface);
  border: 1px solid var(--border); border-radius: 6px;
  box-shadow: var(--card-shadow); overflow: hidden;
}
.list > * + * { border-top: 1px solid var(--border-subtle); }

.list-row {
  display: flex; align-items: center; gap: 24px;
  min-height: 44px; padding: 16px 24px;
  color: inherit; text-decoration: none;
  transition: background 0.2s;
}
a.list-row:hover { background: var(--bg-surface-hover); }
a.list-row:active { background: var(--bg-inset); transition-duration: 0s; }

.list-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.list-title { font-size: var(--type-body); font-weight: 600; color: var(--text-heading); }
.list-desc { font-size: var(--type-small); color: var(--text-muted); margin: 0; }

.list-meta {
  display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 4px 16px;
  font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim);
  white-space: nowrap;
}
.list-meta .is-live { color: var(--accent-ink); }

@media (max-width: 640px) {
  .list-row { flex-direction: column; align-items: flex-start; gap: 8px; padding: 16px; }
  .list-meta { justify-content: flex-start; }
}
```

---

## Stats Panel

Vertical stack of label/value pairs for displaying key metrics. Used in HUD overlays to surface spec data at a glance. Positioned top-right by default.

### HTML

```html
<div class="stats-panel">
  <div class="stat-row">
    <div class="stat-label">Metric Label</div>
    <div class="stat-value">VALUE</div>
  </div>
  <div class="stat-row">
    <div class="stat-label">Another Metric</div>
    <div class="stat-value">42 UNITS</div>
  </div>
  <div class="stat-row">
    <div class="stat-label">Third Metric</div>
    <div class="stat-value">STATUS</div>
  </div>
</div>
```

### CSS

```css
.stats-panel {
  position: absolute;
  top: 28px;
  right: 36px;
  pointer-events: none;
  text-align: right;
}

.stats-panel .stat-row {
  margin-bottom: 8px;
}

.stats-panel .stat-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.stats-panel .stat-value {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  color: var(--accent-ink);
  letter-spacing: 0.06em;
}

/* Proof strip on a landing page: the figure is the claim, so it outranks the lede. */
.stat-value.stat-lg { font-size: var(--type-section); line-height: 1.1; letter-spacing: 0.04em; }
```

---

## Tooltip

Floating overlay that appears on hover, showing name, category/material, and description. Its ground is the theme's own `--bg-base`, so it reads in both themes. The product positions it and shows it on hover.

### HTML

```html
<div class="tooltip">
  <div class="tt-name">Component Name</div>
  <div class="tt-mat">Material or Category</div>
  <div class="tt-desc">Short description of the component or element.</div>
</div>
```

### CSS

In `rising.css`. Placement and show/hide are the product's: position it absolutely and toggle `display`.

```css
.tooltip {
  max-width: 240px; padding: 8px 12px; pointer-events: none;
  background: color-mix(in srgb, var(--bg-base) 92%, transparent);   /* the theme's own base */
  border: 1px solid var(--accent-line); border-radius: 4px;
}
.tooltip .tt-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; letter-spacing: 1px; color: var(--text-heading); }
.tooltip .tt-mat { font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: 0.1em; color: var(--accent-ink); margin-top: 3px; }
.tooltip .tt-desc { font-family: var(--font-text); font-size: var(--type-small); line-height: 1.5; color: var(--text-muted); margin-top: 4px; }
```

---

## Page header

The per-view heading — eyebrow, title, subtitle — one per page. Inside an app shell it sits at the top of `.app-main` as `.page-header` (see "App shell" below); standalone at the top of a page with no app bar it takes the 48px padding shown here. It is **not** the app bar: email, status and sign-out never go in a page header.

### HTML

```html
<header>
  <div class="eyebrow">// Section Label</div>
  <h1>Page Title</h1>
  <p>Subtitle or short description of the page content</p>
</header>
```

### CSS

```css
header {
  padding: 48px 48px 32px;
  border-bottom: 1px solid var(--border);
}

header .eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--accent-ink);
  text-transform: uppercase;
  margin-bottom: 10px;
}

header h1 {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-heading);
  letter-spacing: 3px;
  text-transform: uppercase;
  min-width: 0;
  overflow-wrap: anywhere; /* a record's name can be one long word */
}

@media (max-width: 768px) {
  header { padding: 24px; }
  header h1 { font-size: 1.75rem; }   /* one rung down, still on the scale */
}

header p {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  margin-top: 10px;
}
```

---

## Footer

Minimal mono-text footer for index/landing pages, with a subtle top border. The signed-in product uses `.app-footer` instead — see "App shell" below. The "rising company" mention must be a backlink to `https://rising.company` (see "Branding: rising.company Backlink" in `rising-design.md`).

### HTML

```html
<footer>// site-name &mdash;
  <a href="https://rising.company" target="_blank" rel="noopener noreferrer">rising company</a>
  &middot; hint one &middot; hint two
</footer>
```

### CSS

```css
footer {
  padding: 24px 48px;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

footer a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

footer a:hover {
  color: var(--accent-ink);
}
```

---

## HUD Overlay

Full-viewport heads-up display with scanlines, corner brackets, and positioned content blocks. Used for 3D diagram pages. Contains the title block (top-left), stats panel (top-right), legend (bottom-left), and controls hint (bottom-right). All child elements use `pointer-events: none`.

### HTML

```html
<div class="hud">
  <div class="scanlines"></div>
  <div class="corner tl"></div>
  <div class="corner tr"></div>
  <div class="corner bl"></div>
  <div class="corner br"></div>

  <div class="title-block">
    <h1>// System Label</h1>
    <h2>DIAGRAM TITLE<br />LINE TWO</h2>
    <div class="sub">Subtitle · Interaction hint</div>
  </div>

  <div class="stats-panel">
    <!-- See Stats Panel component -->
  </div>

  <div class="legend">
    <div class="legend-title">// Legend Title</div>
    <div class="legend-item">
      <div class="swatch" style="background: #8b6914"></div>
      <div class="legend-label">Item Label</div>
    </div>
    <div class="legend-sub">Supporting sub-description</div>
  </div>

  <div class="controls-hint">
    <p><span>DRAG</span> — Rotate</p>
    <p><span>SCROLL</span> — Zoom</p>
    <p><span>HOVER</span> — Inspect</p>
  </div>
</div>
```

### CSS

```css
.hud {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0, 0, 0, 0.04) 3px,
    rgba(0, 0, 0, 0.04) 4px
  );
  pointer-events: none;
}

/* Scoped to .hud on purpose. rising.css defines a global `.corner` that is
   position: fixed to the viewport; inside the overlay the brackets belong to
   the .hud box instead, so these must win. */
.hud .corner {
  position: absolute;
  width: 32px;
  height: 32px;
  display: block;
}

.hud .corner.tl {
  top: 16px;
  left: 16px;
  border-top: 1px solid var(--accent-bracket);
  border-left: 1px solid var(--accent-bracket);
}

.hud .corner.tr {
  top: 16px;
  right: 16px;
  border-top: 1px solid var(--accent-bracket);
  border-right: 1px solid var(--accent-bracket);
}

.hud .corner.bl {
  bottom: 16px;
  left: 16px;
  border-bottom: 1px solid var(--accent-bracket);
  border-left: 1px solid var(--accent-bracket);
}

.hud .corner.br {
  bottom: 16px;
  right: 16px;
  border-bottom: 1px solid var(--accent-bracket);
  border-right: 1px solid var(--accent-bracket);
}

.title-block {
  position: absolute;
  top: 28px;
  left: 36px;
  pointer-events: none;
}

.title-block h1 {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: var(--accent-ink);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.title-block h2 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-heading);
  letter-spacing: 2px;
  line-height: 1.1;
}

.title-block .sub {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 6px;
  letter-spacing: 0.1em;
}

.legend {
  position: absolute;
  bottom: 32px;
  left: 36px;
  pointer-events: none;
}

.legend-title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--accent-ink);
  margin-bottom: 10px;
  text-transform: uppercase;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 7px;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.legend-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-body);
}

.legend-sub {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-left: 24px;
  margin-top: -4px;
  margin-bottom: 3px;
}

.controls-hint {
  position: absolute;
  bottom: 32px;
  right: 36px;
  text-align: right;
  pointer-events: none;
}

.controls-hint p {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  line-height: 1.9;
}

.controls-hint span {
  color: var(--accent-ink);
}
```

---

## Grid Layout

Responsive auto-fill grid for laying out cards. Columns fill automatically at a minimum of 280px each. Use `.section-title` to label a group of cards above the grid.

### HTML

```html
<main>
  <div class="section-title">// Section Label</div>
  <div class="grid">
    <!-- Card components go here -->
  </div>
</main>
```

### CSS

```css
.section-title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--text-dim);
  text-transform: uppercase;
  margin-bottom: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
```

---

## Button

Mono, uppercase, tracked — reads as a system control in both themes.

### HTML

```html
<button class="btn btn-primary">Send magic link</button>
<button class="btn btn-secondary">Add to calendar</button>
<button class="btn btn-ghost">Cancel</button>
<button class="btn btn-danger">Delete huddle</button>

<button class="btn btn-primary btn-lg btn-block">Start a huddle</button>
<button class="btn btn-secondary btn-sm">Filter</button>
<button class="btn btn-primary" disabled>Sending&hellip;</button>
```

### CSS

```css
/* A control speaks in the text face, sentence case, at body size —
   the call to action is never the smallest type on the page. */
.btn {
  font-family: var(--font-text);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  padding: 11px 24px;
  border-radius: 4px;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s, transform 0.2s;
}
/* Press: instant on touch-down, eases back on release. Reduced motion dims to 0.8 instead. */
.btn:active:not([disabled]):not([aria-busy="true"]) { transform: scale(0.97); transition-duration: 0s; }

.btn-sm { font-size: 0.875rem; padding: 7px 16px; }   /* 34px */
.btn-lg { padding: 15px 32px; }                         /* 52px; default is 44px */
.btn-block { display: flex; width: 100%; white-space: normal; text-align: center; } /* may wrap at large text */

/* Solid — the loud one. One per view. */
.btn-primary { background: var(--accent); color: var(--accent-on); border-color: var(--accent); }
.btn-primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }

/* Wash — the HUD default for in-app actions */
.btn-secondary { background: var(--accent-wash); color: var(--accent-ink); border-color: var(--accent-line); }
.btn-secondary:hover { background: var(--bg-surface-hover); border-color: var(--accent-ink); }

/* Neutral */
.btn-ghost { background: transparent; color: var(--text-body); border-color: var(--border); }
.btn-ghost:hover { background: var(--bg-surface-hover); border-color: var(--border-hover); color: var(--text-heading); }

/* State recipe applied to danger */
.btn-danger { background: transparent; color: var(--danger-ink); border-color: var(--danger-ink); }
.btn-danger:hover { background: var(--danger-ink); color: var(--bg-base); }

.btn[disabled], .btn[aria-busy="true"] {
  color: var(--text-dim);
  background: transparent;
  border-color: var(--border-subtle);
  cursor: not-allowed;
}
```

### Rules

- `btn-primary` is the single most important action on a view — a landing hero CTA, an auth submit. One per screen.
- Inside Mission app chrome prefer `btn-secondary`; a solid mint slab repeated is too loud.
- `btn-ghost` for everything else — secondary navigation, dismissals, low-stakes choices.
- Disabled introduces no new colors: it drops to the low-emphasis ramp.
- Labels are written in sentence case in the markup (`Start a huddle`). Nothing transforms them.

---

## Form Field

The label has no `//` — fields are items in a set; the prefix goes on the label that opens the form (`// Sign in`), once.

### HTML

```html
<div class="field">
  <label class="field-label" for="email">Email</label>
  <input class="input" id="email" type="email" placeholder="you@company.com"
         autocomplete="email" required>
  <p class="field-help">We'll send a sign-in link — no password.</p>
</div>

<div class="field is-error">
  <label class="field-label" for="email2">Email</label>
  <input class="input" id="email2" type="email" aria-invalid="true" aria-describedby="email2-err">
  <p class="field-error" id="email2-err">Not a valid address.</p>
</div>
```

### CSS

```css
.field { display: flex; flex-direction: column; gap: 8px; }

.field-label {
  font-family: var(--font-text);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-body);
}

.input {
  font-family: var(--font-text);
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-body);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 13px 14px;
  width: 100%;
  transition: border-color 0.2s, background 0.2s;
}

.input::placeholder { color: var(--text-dim); font-weight: 400; }
.input:hover { border-color: var(--border-hover); }
.input:focus { outline: none; border-color: var(--accent-ink); background: var(--bg-surface-hover); }
.input:focus-visible { outline: 1px solid var(--accent-ink); outline-offset: 2px; }
.input[disabled] { color: var(--text-dim); border-color: var(--border-subtle); cursor: not-allowed; }

.field-help { font-family: var(--font-text); font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; }

.field-error {   /* a sentence for a person, not a readout */
  font-family: var(--font-text);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--danger-ink);
}

.field.is-error .input { border-color: var(--danger-ink); }
```

### Rules

- **16px input text, always.** Anything smaller triggers zoom-on-focus in mobile Safari.
- Field labels are IBM Plex Sans 14px / 500 in `--text-body`: they name what to type, for a stranger.
- Placeholders use `--text-dim` (5.5:1) and never stand in for the label.
- Help and error copy are plain English sentences, not terse operator fragments.

---

## Checkbox & Radio

Native inputs in `accent-color: var(--accent-ink)`; the row is the `<label>` (44px); a group is a `fieldset.field` with `legend.field-label`. Radios for one of 2–5 choices; a checkbox takes effect on submit. Rules: `llms.txt` → "Checkbox & Radio".

```html
<fieldset class="field">
  <legend class="field-label">Tell me when</legend>
  <label class="check"><input type="checkbox" name="notify" value="reply" checked>Someone replies</label>
  <label class="check"><input type="checkbox" name="notify" value="close">A huddle closes</label>
</fieldset>

<fieldset class="field">
  <legend class="field-label">Who sees the replies</legend>
  <label class="check"><input type="radio" name="see" value="all" checked>Everyone invited</label>
  <label class="check"><input type="radio" name="see" value="org">Organisers only</label>
</fieldset>

<fieldset class="field is-error" aria-describedby="terms-err">
  <legend class="field-label">Terms</legend>
  <label class="check"><input type="checkbox" name="terms" aria-invalid="true">I agree to the terms of use</label>
  <p class="field-error" id="terms-err">Agree to the terms to continue.</p>
</fieldset>
```

```css
fieldset.field { border: 0; padding: 0; margin: 0; min-width: 0; gap: 0; }
fieldset.field > legend { padding: 0; margin-bottom: 4px; }
fieldset.field > .field-help, fieldset.field > .field-error { margin-top: 4px; }
.check {
  display: flex; align-items: center; gap: 12px; min-height: 2.75rem;
  font-family: var(--font-text); font-size: var(--type-body); line-height: 1.4;
  color: var(--text-body); cursor: pointer;
}
.check input { width: 1.25rem; height: 1.25rem; margin: 0; flex: none; accent-color: var(--accent-ink); cursor: inherit; }
.check:has(input:disabled) { color: var(--text-dim); cursor: not-allowed; }
```

---

## Switch

For a setting that takes effect at once (otherwise a checkbox). Native `input[type=checkbox][role=switch]` drawn in CSS, at the end of a 44px `label.setting`; 40×24, 4px corners; on = thumb moves 16px + `--accent-ink` track. Rules: `llms.txt` → "Switch".

```html
<label class="setting">
  <span>Show weekends</span>
  <input class="switch" type="checkbox" role="switch" name="weekends" checked>
</label>
<label class="setting">
  <span>Sync to calendar<small class="field-help">Connect a calendar first.</small></span>
  <input class="switch" type="checkbox" role="switch" disabled>
</label>
```

```css
.setting {
  display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 2.75rem;
  font-family: var(--font-text); font-size: var(--type-body); line-height: 1.4;
  color: var(--text-body); cursor: pointer;
}
.setting > span { display: flex; flex-direction: column; gap: 2px; }
.setting:has(.switch:disabled) { color: var(--text-dim); cursor: not-allowed; }
.switch {
  appearance: none; -webkit-appearance: none; position: relative; flex: none; margin: 0;
  width: 2.5rem; height: 1.5rem; border-radius: 4px; cursor: inherit;
  background: var(--bg-inset); border: 1px solid var(--text-dim);
  transition: background 0.2s, border-color 0.2s;
}
.switch::before {
  content: ""; position: absolute; top: 3px; left: 3px; width: 1rem; height: 1rem;
  border-radius: 2px; background: var(--text-muted);
  transition: transform 0.2s, background 0.2s;
}
.switch:checked { background: var(--accent-ink); border-color: var(--accent-ink); }
.switch:checked::before { transform: translateX(1rem); background: var(--bg-surface); }
.switch:disabled { border-color: var(--border-hover); }
.switch:disabled::before { background: var(--border-hover); }
@media (forced-colors: active) {   /* drawn, so it names its own system colours */
  .switch, .switch::before { forced-color-adjust: none; }
  .switch { background: Canvas; border-color: ButtonText; }
  .switch::before { background: ButtonText; }
  .switch:checked { background: Highlight; border-color: Highlight; }
  .switch:checked::before { background: HighlightText; }
}
```

---

## Segmented Control

2–4 views of the same content; not navigation. Native radios hidden behind labels in `role="radiogroup"` (arrows move the choice), or `aria-pressed` buttons when a script drives it. Rules: `llms.txt` → "Segmented Control".

```html
<!-- No script: native radios, arrows move the choice -->
<div class="segmented" role="radiogroup" aria-label="Calendar view">
  <label><input type="radio" name="view" value="day">Day</label>
  <label><input type="radio" name="view" value="week" checked>Week</label>
  <label><input type="radio" name="view" value="month">Month</label>
</div>
<!-- Script-driven: buttons with aria-pressed (the showcase theme switch) -->
<div class="segmented" role="group" aria-label="Preview theme">
  <button type="button" aria-pressed="true">Mission</button>
  <button type="button" aria-pressed="false">Daylight</button>
</div>
```

```css
.segmented { display: inline-flex; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; }
.segmented > label, .segmented > button {
  position: relative; display: inline-flex; align-items: center; justify-content: center;
  min-height: 2.25rem; padding: 0 14px; margin: 0;            /* 44px on touch screens */
  font-family: var(--font-text); font-size: var(--type-small); font-weight: 500; line-height: 1.25;
  color: var(--text-muted); background: transparent; border: 0; cursor: pointer; white-space: nowrap;
  transition: background 0.2s, color 0.2s;
}
.segmented > :is(label, button) + :is(label, button) { border-left: 1px solid var(--border); }
.segmented > :hover { color: var(--text-heading); }
.segmented > label:has(input:checked), .segmented > button[aria-pressed="true"] { background: var(--accent-wash); color: var(--accent-ink); }
.segmented input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; pointer-events: none; }
.segmented > label:has(input:focus-visible), .segmented > button:focus-visible { outline: 1px solid var(--accent-ink); outline-offset: -4px; }
@media (forced-colors: active) {
  .segmented > label:has(input:checked), .segmented > button[aria-pressed="true"] { forced-color-adjust: none; background: Highlight; color: HighlightText; }
}
```

---

## Landing Page

A user-facing product needs a landing page before it needs a login box.

### Required order

1. **Nav** — `.nav-brand` left: the wordmark and, 12px after it, the `.app-byline` (`by rising.company`) — the way home from a landing page too; links + one `btn-sm` CTA right. 64px tall, sticky, `border-bottom: 1px solid var(--border)`, `background: var(--bg-base)`. Below 640px the byline and links hide. No backlink among the links — the footer keeps its own.
2. **Hero** — eyebrow → hero title → lede → action row → mono trust line.
3. **Proof strip** — one row of mono stats or a single-line quote. Optional.
4. **How it works** — 3 numbered steps reusing the `01 / 02 / 03` mono numerals.
5. **Feature grid** — 3 cards, `minmax(280px, 1fr)`.
6. **CTA band** — `background: var(--bg-inset)`, full-bleed, `border-block: 1px solid var(--border-subtle)`.
7. **Footer** — column links + the rising.company backlink.

### HTML

```html
<header class="nav">
  <div class="shell nav-inner">
    <div class="nav-brand">
      <a class="wordmark" href="#top">Huddle</a>
      <a class="app-byline" href="https://rising.company">by <span>rising.company</span></a>
    </div>
    <nav class="nav-links">
      <a href="#how">How it works</a>
      <a href="#features">Features</a>
      <a href="#start" class="btn btn-secondary btn-sm">Start a huddle</a>
    </nav>
  </div>
</header>

<section class="shell">
  <div class="hero">
    <div class="eyebrow">// Group scheduling</div>
    <h1 class="hero-title">Huddle</h1>
    <p class="lede">Find a meeting time without the back-and-forth. Share one link.</p>
    <div class="hero-actions">
      <a class="btn btn-primary btn-lg" href="#start">Start a huddle</a>
      <a class="btn btn-ghost btn-lg" href="#how">See how it works</a>
    </div>
    <div class="hero-trust">No password &middot; No calendar access &middot; Free</div>
  </div>
</section>
```

### CSS

```css
/* position + z-index lift the content above .atmosphere, which sits at z-index: 0 */
.shell { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; padding-inline: 48px; }
@media (max-width: 768px) { .shell { padding-inline: 24px; } }

.band { padding-block: 96px; }
@media (max-width: 768px) { .band { padding-block: 64px; } }

.band-inset { background: var(--bg-inset); border-block: 1px solid var(--border-subtle); }

.nav {
  position: sticky; top: 0; z-index: 60;
  min-height: 64px; display: flex; align-items: center;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border);
}
.nav-brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
.nav-brand .wordmark { white-space: nowrap; }

.hero { text-align: center; max-width: 720px; margin: 0 auto; padding: 96px 0 64px; }

.hero-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.25rem, 7vw, 3.5rem);
  letter-spacing: 2px;
  line-height: 1.1;
  text-transform: uppercase;
  color: var(--text-heading);
}

.lede { font-family: var(--font-text); font-size: 1.25rem; line-height: 1.5; color: var(--text-muted); }
.hero .lede { margin: 16px auto 0; max-width: 52ch; }
.hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 32px; }

.hero-trust {
  font-family: var(--font-mono);
  font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--text-dim); margin-top: 24px;
}

.steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 32px; }

.step-num {
  font-family: var(--font-mono);
  font-size: 0.875rem; letter-spacing: 0.1em; color: var(--accent-ink);
  padding-bottom: 12px; margin-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
```

### Rules

- Lede is one sentence, ≤ 90 characters.
- Every band's inner content shares the one `.shell` container so edges line up down the page.
- Vertical rhythm between bands: 96px, 64px below 768px.

Worked example: `patterns/landing.html` in the design-system repo.

---

## Auth Screen

**A bare centered form on an empty field is not an auth screen** — it gives a first-time visitor nothing to decide with.

### Split — default for user-facing products

50/50 above 900px, stacked below. Left: the pitch. Right: a surface card holding the form.

```html
<main class="auth">
  <section class="auth-pitch">
    <div class="eyebrow">// Group scheduling</div>
    <h1 class="hero-title">Huddle</h1>
    <p class="lede">Find a meeting time without the back-and-forth.</p>
    <ul class="auth-points">
      <li><svg class="icon icon-sm" aria-hidden="true"><use href="/icons.svg#plus"/></svg>One link — everyone marks their times</li>
      <li><svg class="icon icon-sm" aria-hidden="true"><use href="/icons.svg#plus"/></svg>No calendar access required</li>
      <li><svg class="icon icon-sm" aria-hidden="true"><use href="/icons.svg#plus"/></svg>Guests reply without an account</li>
    </ul>
  </section>

  <section class="auth-panel">
    <div class="card auth-card">
      <div class="section-label">// Sign in</div>
      <div class="field">
        <label class="field-label" for="email">Email</label>
        <input class="input" id="email" type="email" placeholder="you@company.com" autocomplete="email">
        <p class="field-help">We'll email you a sign-in link. No password to remember.</p>
      </div>
      <button class="btn btn-primary btn-block btn-lg">Send magic link</button>
      <a class="rising-backlink" href="https://rising.company"
         target="_blank" rel="noopener noreferrer">rising.company</a>
    </div>
  </section>
</main>
```

```css
.auth { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }

.auth-pitch, .auth-panel {
  display: flex; flex-direction: column; justify-content: center; padding: 48px;
}

.auth-pitch { background: var(--bg-inset); border-right: 1px solid var(--border-subtle); }

/* Pitch and form meet at the seam: each column pushes its content toward the middle. */
.auth-pitch { align-items: flex-end; }
.auth-pitch > * { width: 100%; max-width: 420px; }
.auth-panel { align-items: flex-start; }

.auth-points {
  list-style: none; padding: 0; margin: 32px 0 0;
  display: flex; flex-direction: column; gap: 12px;
  font-family: var(--font-mono);
  font-size: 0.75rem; letter-spacing: 0.05em; color: var(--text-muted);
}
.auth-points li { display: flex; align-items: center; gap: 10px; }
.auth-points .icon { color: var(--accent-ink); }

.auth-card { max-width: 400px; width: 100%; display: flex; flex-direction: column; gap: 24px; }

@media (max-width: 900px) {
  .auth { grid-template-columns: 1fr; min-height: 0; }
  .auth-pitch { border-right: none; border-bottom: 1px solid var(--border-subtle); padding: 64px 24px 48px; align-items: stretch; }
  .auth-panel { padding: 48px 24px 64px; align-items: center; }
}
```

### Centered — staff / operator sign-in

A single `max-width: 400px` surface card: eyebrow → product name → one-line purpose → field → `btn-primary btn-block` → helper text → backlink. Only appropriate when everyone signing in already knows what the product is.

```css
.auth-centered {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 48px 24px;
}
.auth-centered .card { max-width: 400px; width: 100%; display: flex; flex-direction: column; gap: 24px; }
```

### Copy rules

- Say what the product does *before* asking for an address.
- Name the mechanism: "we'll email you a link — no password".
- Never let the button be the only text on screen.

Worked examples: `patterns/auth-split.html` (Daylight) and `patterns/auth-centered.html` (Mission).

---

## App shell

The chrome behind the auth boundary: app bar on top, one page header per view, app footer at the bottom. Same markup in both themes. Chrome sits on `--bg-surface`, content on `--bg-base` — that one-step lift is the whole hierarchy.

**App bar** — 56px, sticky, full-bleed with the 48px gutter. Four slots: **brand** (favicon mark + product name as a 20px `.wordmark`, linking to the product's home), **byline** (`.app-byline` — `by rising.company`, always; mono label voice, `by` in `--text-dim`, domain in `--text-muted`, `--accent-ink` on hover; it is the link to https://rising.company, same tab, and the one consistent way home from every product — the brand itself is never the way home), optional `.app-context` after it naming a *real* tenant/environment (`· ACME`, `· STAGING`; omitted when there is none), **nav** (3–5 IBM Plex Sans 14px links in sentence case, current one `aria-current="page"` → `--text-heading` + 1px `--accent-ink` rule), **session** (right-aligned: `.status`, then the user menu — trigger is initials chip + email + chevron; panel is `// Signed in as` + email, the product's account items, then Sign out last, ruled off, `--danger-ink` on hover). Status stays outside the menu. The exit is always "Sign out". No `// Rising` eyebrow — the mark says that. No CTA button — that's the landing `.nav`.

**App footer** — 16px vertical padding, mono `--text-dim` uppercase. Left `// PRODUCT · BUILD <date> · <sha>`; right two or three links and the rising.company backlink last. A status strip, not a sitemap.

**Mobile (≤ 768px) — one form for every product.** Bar products: two rows — brand + session (56px), then the nav as a **44px touch row** that bleeds to the viewport edges, scrolls sideways under the 24px gutters with a 24px fade at each edge, and carries the active link's 1px rule on the bar's bottom border. Gutters 24px. Below 640px the byline, the context and the trigger's email hide (the initials chip stays; the footer backlink is the way home) and the footer centers. `<details>` has no light-dismiss — close on outside click and Escape (see the pattern's script).

**Sidebar products** (os, safe) keep a 260px `.app-sidebar` on desktop — `<body class="app has-sidebar">`, `.app-sidebar-top` (brand + byline + context), `.app-sidebar-nav` (`// Modules`, links as `.tag` + `.label`, current one `aria-current="page"` with a 2px accent bar), `.app-sidebar-bottom` (`// Signed in as`, email, account items, Sign out, rule, build, backlink). The sidebar is desktop chrome: below 768px it hides and the product renders the ordinary `.app-bar.app-bar-mobile` + `.app-footer.app-footer-mobile` (hidden above 768px) — modules as the scrolling nav row (labels only), status + user menu top-right, org switcher and account items inside the user menu, build + backlink in the footer. No drawer. Worked example: `patterns/app-shell-sidebar.html`.

### HTML

```html
<body class="app">
  <header class="app-bar">
    <a class="app-brand" href="/" aria-label="Huddle home">
      <img src="https://design-system.rising.company/branding/favicon.svg" alt="">
      <span class="wordmark">Huddle</span>
    </a>
    <a class="app-byline" href="https://rising.company">by <span>rising.company</span></a>
    <nav class="app-nav" aria-label="Primary">
      <a href="/huddles" aria-current="page">Huddles</a>
      <a href="/templates">Templates</a>
      <a href="/settings">Settings</a>
    </nav>
    <div class="app-session">
      <span class="status">Online</span>
      <details class="user-menu">
        <summary class="user-menu-trigger" aria-label="Account menu">
          <span class="user-initials" aria-hidden="true">BC</span>
          <span class="user-menu-email">ben@rising.company</span>
          <svg class="icon icon-sm user-menu-chevron" aria-hidden="true"><use href="/icons.svg#chevron-down"/></svg>
        </summary>
        <div class="user-menu-panel">
          <div class="user-menu-head">
            <div class="section-label">// Signed in as</div>
            <div class="user-menu-email">ben@rising.company</div>
          </div>
          <a class="user-menu-item" href="/settings">Settings</a>
          <a class="user-menu-item" href="/orgs">Switch organization</a>
          <button class="user-menu-item user-menu-signout" type="button">Sign out</button>
        </div>
      </details>
    </div>
  </header>

  <main class="app-main">
    <div class="page-header">
      <div class="eyebrow">// Huddles</div>
      <div class="page-header-row">
        <h1 class="page-title">Your huddles</h1>
        <a class="btn btn-primary btn-sm" href="/huddles/new">New huddle</a>
      </div>
      <p class="subtitle">3 open · 12 closed</p>
    </div>
    …
  </main>

  <footer class="app-footer">
    <span>// Huddle · build 2026-09-18 · 0a7d685</span>
    <span class="app-footer-links">
      <a href="/status">Status</a>
      <a href="/privacy">Privacy</a>
      <a class="rising-backlink" href="https://rising.company" target="_blank" rel="noopener noreferrer">rising.company</a>
    </span>
  </footer>
</body>
```

### CSS

```css
.app { display: flex; flex-direction: column; min-height: 100vh; }
.app-main { flex: 1; position: relative; z-index: 1; padding: 48px; }

.app-bar {
  position: sticky; top: 0; z-index: 60;
  display: flex; flex-wrap: wrap; align-items: center; gap: 8px 32px; /* wraps only when the reader's text is too large to fit */
  min-height: 56px; padding-inline: 48px;
  background: var(--bg-surface); border-bottom: 1px solid var(--border);
}
.app-brand { display: flex; align-items: center; gap: 12px; flex-shrink: 0; color: var(--text-heading); text-decoration: none; }
.app-brand img, .app-brand svg { width: 24px; height: 24px; border-radius: 4px; }
.app-brand .wordmark { letter-spacing: 3px; }   /* 20px, from .wordmark */
.app-byline {
  font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-dim); text-decoration: none; white-space: nowrap;
  transition: color 0.2s;
}
.app-brand + .app-byline { margin-left: -20px; }   /* bar gap 32px → brand gap 12px */
.app-byline span { color: var(--text-muted); transition: color 0.2s; }
.app-byline:hover, .app-byline:hover span { color: var(--accent-ink); }
.app-context {
  font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-dim); white-space: nowrap;
}
.app-context::before { content: "·"; margin-right: 12px; color: var(--text-dim); }

.app-nav { display: flex; align-items: center; gap: 24px; flex: 1 1 auto; min-width: 0; } /* auto basis: too wide → wraps to its own row */
.app-nav a {
  font-family: var(--font-text); font-size: 0.875rem; font-weight: 500;
  color: var(--text-muted); text-decoration: none; white-space: nowrap;
  padding-block: 6px; border-bottom: 1px solid transparent; transition: color 0.2s, border-color 0.2s;
}
.app-nav a:hover { color: var(--accent-ink); }
.app-nav a[aria-current="page"] { color: var(--text-heading); border-bottom-color: var(--accent-ink); }

.app-session { display: flex; align-items: center; gap: 20px; margin-left: auto; flex-shrink: 0; }

/* User menu — <details>/<summary>; a framework may swap in its own popover
   but keeps the classes and the item order. */
.user-menu { position: relative; }
.user-menu > summary { list-style: none; }
.user-menu > summary::-webkit-details-marker { display: none; }
.user-menu-trigger {
  display: flex; align-items: center; gap: 10px; padding: 4px 0; cursor: pointer;
  border-radius: 4px; color: var(--text-muted); transition: color 0.2s;
}
.user-menu-trigger:hover, .user-menu[open] > .user-menu-trigger { color: var(--text-heading); }
.user-menu-email {
  font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.05em;
  max-width: 24ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.user-initials {
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 4px; flex-shrink: 0;
  font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--accent-ink); background: var(--accent-wash); border: 1px solid var(--accent-line);
}
.user-menu-chevron { transition: transform 0.2s; }
.user-menu[open] .user-menu-chevron { transform: rotate(180deg); }
.user-menu-panel {
  position: absolute; top: calc(100% + 8px); right: 0; z-index: 70;
  min-width: 240px; padding: 6px;
  background: var(--bg-surface); border: 1px solid var(--border-hover);
  border-radius: 6px; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
}
[data-theme="daylight"] .user-menu-panel { box-shadow: 0 12px 32px rgba(11, 26, 20, 0.12); }
.user-menu-head { padding: 8px 10px 10px; margin-bottom: 6px; border-bottom: 1px solid var(--border); }
.user-menu-head .section-label { letter-spacing: 0.15em; margin-bottom: 4px; }
.user-menu-head .user-menu-email { max-width: none; color: var(--text-body); }
.user-menu-item {
  display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 10px; border-radius: 4px; text-align: left;
  font-family: var(--font-text); font-size: 0.875rem; font-weight: 500;
  color: var(--text-body); background: none; border: 0; cursor: pointer; text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.user-menu-item:hover { background: var(--bg-surface-hover); color: var(--text-heading); }
.user-menu-signout { margin-top: 6px; border-top: 1px solid var(--border); border-radius: 0 0 4px 4px; padding-top: 12px; }
.user-menu-signout:hover { color: var(--danger-ink); }

.status {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-dim); white-space: nowrap;
}
.status::before {
  content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
  animation: status-pulse 2.4s ease-out infinite;
}
.status.is-degraded::before { background: var(--warning); animation: none; }
.status.is-down::before { background: var(--danger); animation: none; }
@keyframes status-pulse {
  0% { box-shadow: 0 0 0 0 var(--accent-line); } 70% { box-shadow: 0 0 0 6px transparent; } 100% { box-shadow: 0 0 0 0 transparent; }
}

.page-header { padding-bottom: 24px; margin-bottom: 32px; border-bottom: 1px solid var(--border); }
.page-header .eyebrow { margin-bottom: 8px; }
.page-header .subtitle { margin-top: 8px; }
.page-header-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px 24px; flex-wrap: wrap; }

.app-footer {
  position: relative; z-index: 1;
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: 12px 24px; padding: 16px 48px;
  background: var(--bg-surface); border-top: 1px solid var(--border);
  font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-dim);
}
.app-footer a { color: inherit; text-decoration: none; transition: color 0.2s; }
.app-footer a:hover { color: var(--accent-ink); }
.app-footer-links { display: flex; flex-wrap: wrap; align-items: center; gap: 20px; }

/* Sidebar products — desktop chrome; hidden below 768px (see above) */
.app.has-sidebar { flex-direction: row; }
.app.has-sidebar > .app-main { min-width: 0; }
.app-sidebar {
  display: flex; flex-direction: column; flex-shrink: 0; width: min(16.25rem, 40vw); /* 260px at default text size */
  position: sticky; top: 0; height: 100vh;
  background: var(--bg-surface); border-right: 1px solid var(--border);
}
.app-sidebar-top { padding: 40px 32px 28px; display: flex; flex-direction: column; gap: 12px; }
.app-sidebar-top .app-brand .wordmark { letter-spacing: 2px; }
.app-sidebar-top .app-brand + .app-byline { margin: -4px 0 0; }
.app-sidebar-top .app-context::before { content: none; }
.app-sidebar-rule { height: 1px; margin: 0 24px; background: var(--border); flex-shrink: 0; }
.app-sidebar-nav { padding: 28px 20px; flex: 1; min-height: 0; overflow-y: auto; }
.app-sidebar-nav .section-label { margin: 0 4px 20px; }
.app-sidebar-nav a {
  position: relative; display: flex; align-items: center; gap: 12px; padding: 10px 12px;
  border-radius: 6px; text-decoration: none; color: var(--text-muted); transition: background 0.2s, color 0.2s;
}
.app-sidebar-nav a + a { margin-top: 4px; }
.app-sidebar-nav a:hover { color: var(--text-heading); background: color-mix(in srgb, var(--bg-surface-hover) 50%, transparent); }
.app-sidebar-nav a[aria-current="page"] { color: var(--text-heading); background: var(--bg-surface-hover); }
.app-sidebar-nav a[aria-current="page"]::before {
  content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  width: 2px; height: 16px; border-radius: 1px; background: var(--accent);
}
.app-sidebar-nav .tag { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 1px; width: 1.75rem; flex-shrink: 0; color: var(--text-muted); }
.app-sidebar-nav a[aria-current="page"] .tag { color: var(--accent-ink); }
.app-sidebar-nav .label { font-family: var(--font-text); font-size: 0.875rem; font-weight: 500; }
.app-sidebar-bottom { padding: 20px 32px; display: flex; flex-direction: column; gap: 8px; }
.app-sidebar-bottom .user-menu-email { max-width: none; color: var(--text-muted); }
.app-sidebar-bottom a, .app-sidebar-bottom button {
  align-self: flex-start; padding: 0; background: none; border: 0; cursor: pointer;
  font-family: var(--font-text); font-size: 0.875rem; font-weight: 500;
  color: var(--text-muted); text-decoration: none; transition: color 0.2s;
}
.app-sidebar-bottom a:hover, .app-sidebar-bottom button:hover { color: var(--text-heading); }
.app-sidebar-bottom .user-menu-signout { margin: 0; border: 0; padding: 0; width: auto; }
.app-sidebar-bottom .user-menu-signout:hover { color: var(--danger-ink); }
.app-sidebar-bottom .app-sidebar-rule { margin: 12px 0; }
.app-sidebar-bottom .build { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-dim); white-space: nowrap; }
.app-sidebar-bottom .rising-backlink {   /* the backlink keeps its mono voice */
  font-family: var(--font-mono); font-size: 0.75rem; font-weight: 400;
  letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-dim);
}
.app-bar-mobile, .app-footer-mobile { display: none; }

@media (max-width: 768px) {
  .app-main { padding: 24px; }
  .app-footer { padding-inline: 24px; }
  .app-bar { flex-wrap: wrap; gap: 0 24px; padding-inline: 24px; min-height: 0; }
  .app-brand, .app-session { min-height: 56px; }
  .app-brand + .app-byline { margin-left: -12px; }
  /* 44px touch row, full-bleed scroll under the gutters, 24px edge fade */
  .app-nav {
    order: 3; flex-basis: 100%; gap: 24px; overflow-x: auto; scrollbar-width: none;
    margin-inline: -24px; padding-inline: 24px;
    mask-image: linear-gradient(to right, transparent, #000 24px, #000 calc(100% - 24px), transparent);
  }
  .app-nav::-webkit-scrollbar { display: none; }
  .app-nav a { padding: 15px 0 14px; line-height: 1; }
  /* Sidebar products swap the sidebar for the bar and the footer */
  .app.has-sidebar { flex-direction: column; }
  .app-sidebar { display: none; }
  .app-bar-mobile, .app-footer-mobile { display: flex; }
}
@media (max-width: 640px) {
  .app-byline, .app-context, .user-menu-trigger .user-menu-email { display: none; }
  .app-footer { justify-content: center; text-align: center; }
}
```

Worked example: `patterns/app-shell.html` (Mission; switch `data-theme` for Daylight).

---

## Empty State

```html
<div class="empty-state">
  <div class="section-label">// No huddles yet</div>
  <p class="body">Create one and share the link — people mark their times without signing up.</p>
  <button class="btn btn-secondary">New huddle</button>
</div>
```

```css
.empty-state { text-align: center; max-width: 420px; margin: 0 auto; padding-block: 96px; }
.empty-state .body { margin: 12px 0 24px; }
```

Eyebrow → one-line explanation in `--text-muted` → one `btn-secondary`. Never a bare "No results."
