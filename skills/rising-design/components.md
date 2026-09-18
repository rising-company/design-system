# Component Reference

Detailed HTML/CSS anatomy for every component pattern. Extract the exact CSS values from this file when building components.

All values below reference theme variables (`var(--token)`). Both themes — **Mission** (dark, default) and **Daylight** (light) — define the identical token set, so every component here is written once and works in either. Set `data-theme="mission"` or `data-theme="daylight"` on the root element; see `rising-design.md` for the token values and for how to choose.

The whole layer is also published as a drop-in stylesheet:
`<link rel="stylesheet" href="https://design-system.rising.company/rising.css">`

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
  <div class="card-arrow">&#8594;</div>
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
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  letter-spacing: 0.15em;
  color: var(--accent-ink);
  text-transform: uppercase;
  margin-bottom: 10px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-heading);
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 14px;
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
  font-family: "Share Tech Mono", monospace;
  font-size: 14px;
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
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  letter-spacing: 0.05em;
  color: var(--text-label);
  background: var(--bg-inset);
  border: 1px solid var(--border-subtle);
  border-radius: 3px;
  padding: 3px 7px;
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
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  color: var(--text-label);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.stats-panel .stat-value {
  font-family: "Share Tech Mono", monospace;
  font-size: 17px;
  color: var(--accent-ink);
  letter-spacing: 0.06em;
}
```

---

## Tooltip

Floating overlay that appears on hover, showing name, category/material, and description. Positioned absolutely via JavaScript. Hidden by default (`display: none`), shown on mouseover.

### HTML

```html
<div class="tooltip">
  <div class="tt-name">Component Name</div>
  <div class="tt-mat">Material or Category</div>
  <div class="tt-desc">Short description of the component or element.</div>
</div>
```

### CSS

```css
.tooltip {
  position: absolute;
  background: color-mix(in srgb, var(--bg-base) 92%, transparent);
  border: 1px solid var(--accent-line);
  border-radius: 4px;
  padding: 8px 12px;
  pointer-events: none;
  display: none;
  max-width: 200px;
}

.tooltip .tt-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-heading);
  letter-spacing: 1px;
}

.tooltip .tt-mat {
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  color: var(--accent-ink);
  letter-spacing: 0.1em;
  margin-top: 3px;
}

.tooltip .tt-desc {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
  line-height: 1.5;
}
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
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--accent-ink);
  text-transform: uppercase;
  margin-bottom: 10px;
}

header h1 {
  font-size: 36px;
  font-weight: 700;
  color: var(--text-heading);
  letter-spacing: 3px;
  text-transform: uppercase;
}

header p {
  font-family: "Share Tech Mono", monospace;
  font-size: 13px;
  color: var(--text-subtle);
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
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
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
  font-family: "Share Tech Mono", monospace;
  font-size: 13px;
  letter-spacing: 0.2em;
  color: var(--accent-ink);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.title-block h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-heading);
  letter-spacing: 2px;
  line-height: 1.1;
}

.title-block .sub {
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  color: var(--text-subtle);
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
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
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
  font-size: 14px;
  font-weight: 500;
  color: var(--text-body);
  letter-spacing: 1px;
}

.legend-sub {
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  color: var(--text-subtle);
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
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  color: var(--text-label);
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
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--text-label);
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
.btn {
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 13px 26px;
  border-radius: 4px;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s;
}

.btn-sm { font-size: 12px; padding: 9px 18px; letter-spacing: 0.075em; }
.btn-lg { font-size: 13px; padding: 17px 34px; letter-spacing: 0.15em; }
.btn-block { display: flex; width: 100%; }

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
  color: var(--text-label);
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
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-label);
}

.input {
  font-family: "Rajdhani", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-body);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 13px 14px;
  width: 100%;
  transition: border-color 0.2s, background 0.2s;
}

.input::placeholder { color: var(--text-label); font-weight: 400; }
.input:hover { border-color: var(--border-hover); }
.input:focus { outline: none; border-color: var(--accent-ink); background: var(--bg-surface-hover); }
.input:focus-visible { outline: 1px solid var(--accent-ink); outline-offset: 2px; }
.input[disabled] { color: var(--text-label); border-color: var(--border-subtle); cursor: not-allowed; }

.field-help { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

.field-error {
  font-family: "Share Tech Mono", monospace;
  font-size: 12px;
  letter-spacing: 0.05em;
  color: var(--danger-ink);
}

.field.is-error .input { border-color: var(--danger-ink); }
```

### Rules

- **16px input text, always.** Anything smaller triggers zoom-on-focus in mobile Safari.
- Placeholders use `--text-label`. Never `--text-dim` — a placeholder people can't read is worse than no placeholder.
- Help and error copy are plain English sentences, not terse operator fragments.

---

## Landing Page

A user-facing product needs a landing page before it needs a login box.

### Required order

1. **Nav** — wordmark left; links + one `btn-sm` CTA right. 64px tall, sticky, `border-bottom: 1px solid var(--border)`, `background: var(--bg-base)`.
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
    <a class="wordmark" href="#top">Huddle</a>
    <nav class="nav-links">
      <a href="#how">How it works</a>
      <a href="#features">Features</a>
      <a href="#start" class="btn btn-secondary btn-sm">Start a huddle</a>
    </nav>
  </div>
</header>

<section class="shell">
  <div class="hero">
    <div class="eyebrow">// Rising Company</div>
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
  height: 64px; display: flex; align-items: center;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border);
}

.hero { text-align: center; max-width: 720px; margin: 0 auto; padding: 96px 0 64px; }

.hero-title {
  font-family: "Rajdhani", sans-serif;
  font-weight: 700;
  font-size: clamp(36px, 7vw, 56px);
  letter-spacing: 2px;
  line-height: 1.1;
  text-transform: uppercase;
  color: var(--text-heading);
}

.lede { font-size: 18px; line-height: 1.5; color: var(--text-muted); }
.hero .lede { margin: 16px auto 0; max-width: 52ch; }
.hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 32px; }

.hero-trust {
  font-family: "Share Tech Mono", monospace;
  font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--text-label); margin-top: 24px;
}

.steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 32px; }

.step-num {
  font-family: "Share Tech Mono", monospace;
  font-size: 13px; letter-spacing: 0.1em; color: var(--accent-ink);
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
    <div class="eyebrow">// Rising Company</div>
    <h1 class="hero-title">Huddle</h1>
    <p class="lede">Find a meeting time without the back-and-forth.</p>
    <ul class="auth-points">
      <li>One link — everyone marks their times</li>
      <li>No calendar access required</li>
      <li>Guests reply without an account</li>
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

.auth-points {
  list-style: none; padding: 0; margin: 32px 0 0;
  display: flex; flex-direction: column; gap: 12px;
  font-family: "Share Tech Mono", monospace;
  font-size: 12px; letter-spacing: 0.05em; color: var(--text-subtle);
}
.auth-points li::before { content: \"+\"; color: var(--accent-ink); margin-right: 10px; }

.auth-card { max-width: 400px; width: 100%; display: flex; flex-direction: column; gap: 24px; }

@media (max-width: 900px) {
  .auth { grid-template-columns: 1fr; min-height: 0; }
  .auth-pitch { border-right: none; border-bottom: 1px solid var(--border-subtle); padding: 64px 24px 48px; }
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

**App bar** — 56px, sticky, full-bleed with the 48px gutter. Three slots: **brand** (favicon mark + product name as an 18px `.wordmark`, optional `.app-context` naming the tenant/environment), **nav** (3–5 mono links, current one `aria-current="page"` → `--text-heading` + 1px `--accent-ink` rule), **session** (right-aligned: `.status`, then the user menu — trigger is initials chip + email + chevron; panel is `// Signed in as` + email, the product's account items, then Sign out last, ruled off, `--danger-ink` on hover). Status stays outside the menu. The exit is always "Sign out". No `// Rising` eyebrow — the mark says that. No CTA button — that's the landing `.nav`.

**App footer** — 16px vertical padding, mono `--text-dim` uppercase. Left `// PRODUCT · BUILD <date> · <sha>`; right two or three links and the rising.company backlink last. A status strip, not a sitemap.

Below 768px the bar becomes two rows (brand + session, then the nav scrolling sideways) with 24px gutters. Below 640px the context and the trigger's email hide (the initials chip stays) and the footer centers. `<details>` has no light-dismiss — close on outside click and Escape (see the pattern's script). Sidebar products (os, safe) keep their sidebar: brand + context at the top, session + build + backlink at the bottom, no separate footer.

### HTML

```html
<body class="app">
  <header class="app-bar">
    <a class="app-brand" href="/" aria-label="Huddle home">
      <img src="https://design-system.rising.company/branding/favicon.svg" alt="">
      <span class="wordmark">Huddle</span>
    </a>
    <span class="app-context">Rising Company</span>
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
          <span class="user-menu-chevron" aria-hidden="true"></span>
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
  display: flex; align-items: center; gap: 32px;
  min-height: 56px; padding-inline: 48px;
  background: var(--bg-surface); border-bottom: 1px solid var(--border);
}
.app-brand { display: flex; align-items: center; gap: 12px; flex-shrink: 0; color: var(--text-heading); text-decoration: none; }
.app-brand img, .app-brand svg { width: 24px; height: 24px; border-radius: 4px; }
.app-brand .wordmark { font-size: 18px; letter-spacing: 3px; }
.app-context {
  font-family: "Share Tech Mono", monospace; font-size: 12px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-label); white-space: nowrap;
}
.app-context::before { content: "·"; margin-right: 12px; color: var(--text-dim); }

.app-nav { display: flex; align-items: center; gap: 24px; flex: 1; min-width: 0; }
.app-nav a {
  font-family: "Share Tech Mono", monospace; font-size: 12px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-label); text-decoration: none; white-space: nowrap;
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
  border-radius: 4px; color: var(--text-subtle); transition: color 0.2s;
}
.user-menu-trigger:hover, .user-menu[open] > .user-menu-trigger { color: var(--text-heading); }
.user-menu-email {
  font-family: "Share Tech Mono", monospace; font-size: 12px; letter-spacing: 0.05em;
  max-width: 24ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.user-initials {
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 4px; flex-shrink: 0;
  font-family: "Share Tech Mono", monospace; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--accent-ink); background: var(--accent-wash); border: 1px solid var(--accent-line);
}
.user-menu-chevron {
  width: 8px; height: 8px; border-right: 1px solid currentColor; border-bottom: 1px solid currentColor;
  transform: translateY(-2px) rotate(45deg); transition: transform 0.2s;
}
.user-menu[open] .user-menu-chevron { transform: translateY(2px) rotate(225deg); }
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
  display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px; border-radius: 4px; text-align: left;
  font-family: "Share Tech Mono", monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-label); background: none; border: 0; cursor: pointer; text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.user-menu-item:hover { background: var(--bg-surface-hover); color: var(--text-heading); }
.user-menu-signout { margin-top: 6px; border-top: 1px solid var(--border); border-radius: 0 0 4px 4px; padding-top: 12px; }
.user-menu-signout:hover { color: var(--danger-ink); }

.status {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: "Share Tech Mono", monospace; font-size: 12px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-label); white-space: nowrap;
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
  font-family: "Share Tech Mono", monospace; font-size: 12px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-dim);
}
.app-footer a { color: inherit; text-decoration: none; transition: color 0.2s; }
.app-footer a:hover { color: var(--accent-ink); }
.app-footer-links { display: flex; flex-wrap: wrap; align-items: center; gap: 20px; }

@media (max-width: 768px) {
  .app-main { padding: 24px; }
  .app-footer { padding-inline: 24px; }
  .app-bar { flex-wrap: wrap; gap: 0 24px; padding-inline: 24px; min-height: 0; }
  .app-brand, .app-session { min-height: 56px; }
  .app-nav { order: 3; flex-basis: 100%; gap: 20px; overflow-x: auto; scrollbar-width: none; padding-bottom: 10px; }
  .app-nav::-webkit-scrollbar { display: none; }
  .app-nav a { padding-block: 2px 4px; }
}
@media (max-width: 640px) {
  .app-context, .user-menu-trigger .user-menu-email { display: none; }
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
