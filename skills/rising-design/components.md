# Component Reference

Detailed HTML/CSS anatomy for every component pattern. Extract the exact CSS values from this file when building components.

---

## Card

A clickable container with eyebrow tag, title, description, badge row, and arrow indicator. Use for navigation links to pages, diagrams, or sections. Features a gradient top-border that appears on hover.

### HTML

```html
<a class="card" href="#">
  <div class="card-tag">// Category · Subcategory</div>
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
  border: 1px solid #1a2a20;
  border-radius: 6px;
  padding: 24px;
  background: #0d1117;
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
  background: linear-gradient(90deg, #3af0a0, #2a7adf);
  opacity: 0;
  transition: opacity 0.2s;
}

.card:hover {
  border-color: #2a4a38;
  background: #0f1520;
}

.card:hover::before {
  opacity: 1;
}

.card-tag {
  font-family: "Share Tech Mono", monospace;
  font-size: 9px;
  letter-spacing: 3px;
  color: #3af0a0;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #e8f4ff;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 13px;
  color: #6a8a80;
  line-height: 1.5;
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
  color: #1a3a2a;
  transition: color 0.2s;
}

.card:hover .card-arrow {
  color: #3af0a0;
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
  font-family: "Share Tech Mono", monospace;
  font-size: 9px;
  letter-spacing: 1px;
  color: #3a5a50;
  background: #0a1410;
  border: 1px solid #1a3020;
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
  font-size: 9px;
  color: #3a5a50;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.stats-panel .stat-value {
  font-family: "Share Tech Mono", monospace;
  font-size: 16px;
  color: #3af0a0;
  letter-spacing: 1px;
}
```

---

## Tooltip

Floating overlay that appears on hover, showing name, category/material, and description. Positioned absolutely via JavaScript. Hidden by default (`display: none`), shown on mouseover.

### HTML

```html
<div class="tooltip">
  <div class="tt-name">Component Name</div>
  <div class="tt-mat">// Material or Category</div>
  <div class="tt-desc">Short description of the component or element.</div>
</div>
```

### CSS

```css
.tooltip {
  position: absolute;
  background: rgba(10, 12, 16, 0.92);
  border: 1px solid #3af0a050;
  border-radius: 4px;
  padding: 8px 12px;
  pointer-events: none;
  display: none;
  max-width: 200px;
}

.tooltip .tt-name {
  font-size: 13px;
  font-weight: 700;
  color: #e8f4ff;
  letter-spacing: 1px;
}

.tooltip .tt-mat {
  font-family: "Share Tech Mono", monospace;
  font-size: 9px;
  color: #3af0a0;
  letter-spacing: 2px;
  margin-top: 3px;
}

.tooltip .tt-desc {
  font-size: 11px;
  color: #7a9a9a;
  margin-top: 4px;
  line-height: 1.4;
}
```

---

## Header

Page header with eyebrow, title, and subtitle. Used at the top of index/landing pages. The eyebrow uses monospace and the title uses Rajdhani bold.

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
  border-bottom: 1px solid #1a2a20;
}

header .eyebrow {
  font-family: "Share Tech Mono", monospace;
  font-size: 10px;
  letter-spacing: 4px;
  color: #3af0a0;
  text-transform: uppercase;
  margin-bottom: 10px;
}

header h1 {
  font-size: 36px;
  font-weight: 700;
  color: #e8f4ff;
  letter-spacing: 3px;
  text-transform: uppercase;
}

header p {
  font-family: "Share Tech Mono", monospace;
  font-size: 11px;
  color: #4a6a5a;
  letter-spacing: 2px;
  margin-top: 10px;
}
```

---

## Footer

Minimal mono-text footer. Used at the bottom of index/landing pages with a subtle top border. The "rising company" mention must be a backlink to `https://rising.company` (see "Branding: rising.company Backlink" in `rising-design.md`).

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
  border-top: 1px solid #1a2a20;
  font-family: "Share Tech Mono", monospace;
  font-size: 9px;
  color: #2a3a30;
  letter-spacing: 2px;
}

footer a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

footer a:hover {
  color: #3af0a0;
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
    <div class="sub">// Subtitle · Interaction hint</div>
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

.corner {
  position: absolute;
  width: 32px;
  height: 32px;
}

.corner.tl {
  top: 16px;
  left: 16px;
  border-top: 1px solid #3af0a040;
  border-left: 1px solid #3af0a040;
}

.corner.tr {
  top: 16px;
  right: 16px;
  border-top: 1px solid #3af0a040;
  border-right: 1px solid #3af0a040;
}

.corner.bl {
  bottom: 16px;
  left: 16px;
  border-bottom: 1px solid #3af0a040;
  border-left: 1px solid #3af0a040;
}

.corner.br {
  bottom: 16px;
  right: 16px;
  border-bottom: 1px solid #3af0a040;
  border-right: 1px solid #3af0a040;
}

.title-block {
  position: absolute;
  top: 28px;
  left: 36px;
  pointer-events: none;
}

.title-block h1 {
  font-family: "Share Tech Mono", monospace;
  font-size: 11px;
  letter-spacing: 4px;
  color: #3af0a0;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.title-block h2 {
  font-size: 28px;
  font-weight: 700;
  color: #e8f4ff;
  letter-spacing: 2px;
  line-height: 1.1;
}

.title-block .sub {
  font-family: "Share Tech Mono", monospace;
  font-size: 10px;
  color: #5a8a7a;
  margin-top: 6px;
  letter-spacing: 2px;
}

.legend {
  position: absolute;
  bottom: 32px;
  left: 36px;
  pointer-events: none;
}

.legend-title {
  font-family: "Share Tech Mono", monospace;
  font-size: 9px;
  letter-spacing: 3px;
  color: #3af0a0;
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
  font-size: 13px;
  font-weight: 500;
  color: #c8d8e8;
  letter-spacing: 1px;
}

.legend-sub {
  font-family: "Share Tech Mono", monospace;
  font-size: 9px;
  color: #4a7a6a;
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
  font-size: 9px;
  color: #3a5a50;
  letter-spacing: 2px;
  line-height: 1.9;
}

.controls-hint span {
  color: #3af0a0;
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
  font-size: 9px;
  letter-spacing: 4px;
  color: #3a5a50;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
```
