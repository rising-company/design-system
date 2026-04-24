# Rising Company Design System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a design system extracted from rv-diagrams that ships as a deployed visual reference site, an `llms.txt` for machine consumption, and a Claude Code skill for on-demand use.

**Architecture:** Static site deployed to Vercel at `design-system.rising.company`. Three artifacts — `index.html` (human visual reference), `llms.txt` (LLM-readable spec), and a skill directory (`skills/rising-design/`) with a main skill file and component reference. No build step, no dependencies.

**Tech Stack:** HTML, CSS (vanilla), Markdown, Vercel static hosting

**Spec:** `docs/superpowers/specs/2026-04-24-rising-design-system.md`

**Source of truth for all tokens:** `../rv-diagrams/index.html` and `../rv-diagrams/battery-box.html`

---

## File Structure

```
design-system/
├── index.html                         # Visual reference — tokens, typography, component demos
├── llms.txt                           # Complete design system in LLM-readable plain text
├── vercel.json                        # Vercel static deploy config
├── .gitignore                         # Ignore .superpowers/, .vercel/
├── skills/
│   └── rising-design/
│       ├── rising-design.md           # Skill frontmatter + core tokens/principles inline
│       └── components.md              # Full HTML/CSS anatomy for each component pattern
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-04-24-rising-design-system.md
        └── plans/
            └── 2026-04-24-rising-design-system.md  (this file)
```

---

### Task 1: Project scaffolding

**Files:**
- Create: `.gitignore`
- Create: `vercel.json`

- [ ] **Step 1: Initialize git repo**

```bash
cd /Users/bencao/rising-company/design-system
git init
```

- [ ] **Step 2: Create .gitignore**

Create `.gitignore`:

```
.superpowers/
.vercel/
.DS_Store
```

- [ ] **Step 3: Create vercel.json**

Create `vercel.json` — matches the rv-diagrams pattern (static serving from root):

```json
{
  "outputDirectory": "."
}
```

- [ ] **Step 4: Commit scaffolding**

```bash
git add .gitignore vercel.json
git commit -m "chore: init project with vercel config"
```

---

### Task 2: Create llms.txt

The canonical machine-readable spec. This is the single source of truth that the skill file points to and that external LLMs can fetch. Contains ALL tokens, ALL component patterns, ALL voice/tone rules, ALL layout principles — everything an LLM needs to generate on-brand UI.

**Files:**
- Create: `llms.txt`

- [ ] **Step 1: Write llms.txt**

Create `llms.txt` with the following content. This follows the llms.txt convention — plain text with markdown structure, no HTML, no frontmatter. Sections are ordered for LLM consumption: identity first, then tokens, then components, then principles.

```markdown
# Rising Company Design System

> Mission control / technical HUD aesthetic — dark backgrounds, monospace system labels, mint-green accents, scanline textures, generous spacing.

## Fonts

Import: https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;500;700&display=swap

- Display/Content: "Rajdhani", sans-serif — weights 300, 500, 700
- System/Technical: "Share Tech Mono", monospace

## Colors

### Backgrounds
- Base: #0a0c10 — page background
- Surface: #0d1117 — cards, panels, elevated containers
- Surface Hover: #0f1520 — interactive surface hover state
- Inset: #0a1410 — badge backgrounds, recessed areas

### Borders
- Default: #1a2a20 — card borders, dividers
- Hover: #2a4a38 — card hover borders
- Subtle: #1a3020 — badge borders, faint separators
- Grid: #111820 — background structural lines

### Text
- Heading: #e8f4ff — page titles, card titles, tooltip names
- Body: #c8d8e8 — primary body text, legend labels
- Muted: #6a8a80 — descriptions, secondary body text
- Subtle: #4a6a5a — subtitles, secondary mono text
- Label: #3a5a50 — section titles, stat labels, control hints
- Dim: #2a3a30 — footer text, lowest emphasis

### Accents
- Primary (Mint): #3af0a0 — eyebrows, stat values, active highlights
- Secondary (Blue): #2a7adf — gradient endpoints, secondary accent
- Danger (Red): #cc2200 — error/danger states
- Warning (Amber): #ddaa30 — warning/caution states

### Accent Derivatives
- Primary @ 25% alpha: #3af0a040 — corner bracket borders
- Primary @ 31% alpha: #3af0a050 — tooltip borders
- Gradient: linear-gradient(90deg, #3af0a0, #2a7adf) — card hover top-border

## Text Styles

| Style | Family | Size | Weight | Letter-Spacing | Transform | Color |
|---|---|---|---|---|---|---|
| Eyebrow | Share Tech Mono | 10px | normal | 4px | uppercase | #3af0a0 |
| Page Title | Rajdhani | 36px | 700 | 3px | uppercase | #e8f4ff |
| Section Heading | Rajdhani | 28px | 700 | 2px | none | #e8f4ff |
| Card Title | Rajdhani | 20px | 700 | 1px | none | #e8f4ff |
| Body | Rajdhani | 13px | 400 | normal | none | #6a8a80 |
| Stat Value | Share Tech Mono | 16px | normal | 1px | none | #3af0a0 |
| Subtitle | Share Tech Mono | 11px | normal | 2px | none | #4a6a5a |
| Section Label | Share Tech Mono | 9px | normal | 4px | uppercase | #3a5a50 |
| Badge | Share Tech Mono | 9px | normal | 1px | none | #3a5a50 |
| Footer | Share Tech Mono | 9px | normal | 2px | none | #2a3a30 |

## Spacing

- Page: 48px — header, main, side padding
- Section: 32px — between major sections
- Element: 24px — card padding, footer vertical padding
- Grid: 16px — grid gap between cards
- Inline: 12px — gap between badges
- Tight: 8px — between related text elements

## Border Radius

- Card: 6px — cards, panels
- Tooltip: 4px — tooltips, floating elements
- Badge: 3px — badges, small tags

## Transitions

All interactive transitions: 0.2s default easing. Properties: border-color, background, color, opacity.

## Visual Effects

### Scanlines (required on every page)
Fixed overlay, pointer-events: none, z-index: 100:
```css
background: repeating-linear-gradient(
  to bottom,
  transparent 0px, transparent 3px,
  rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px
);
```

### Corner Brackets
32x32px L-shaped borders at viewport corners. Border color: #3af0a040. Positioned 16px from edges. Use border-top + border-left for top-left, etc.

### Card Hover Gradient
2px bar at card top: linear-gradient(90deg, #3af0a0, #2a7adf). Hidden (opacity: 0) by default, opacity: 1 on hover.

## Components

### Card
Structure: eyebrow tag → title → description → badge row
- Container: background #0d1117, border 1px solid #1a2a20, border-radius 6px, padding 24px
- Hover: background #0f1520, border-color #2a4a38, gradient top-bar opacity 1
- Gradient bar: position absolute, top 0, left 0, right 0, height 2px
- Arrow indicator: position absolute, bottom 24px, right 24px, mono font, color #1a3a2a → #3af0a0 on hover

### Badge
- Font: Share Tech Mono, 9px, letter-spacing 1px
- Background: #0a1410, border: 1px solid #1a3020, border-radius 3px, padding 3px 7px

### Stats Panel
Vertical stack of stat rows:
- Label: Share Tech Mono, 9px, letter-spacing 2px, uppercase, color #3a5a50
- Value: Share Tech Mono, 16px, letter-spacing 1px, color #3af0a0

### Tooltip
- Background: rgba(10, 12, 16, 0.92), border: 1px solid #3af0a050, border-radius 4px, padding 8px 12px
- Name: 13px, font-weight 700, color #e8f4ff, letter-spacing 1px
- Material line: Share Tech Mono, 9px, color #3af0a0, letter-spacing 2px
- Description: 11px, color #7a9a9a, line-height 1.4

### Header
- Structure: eyebrow → page title → subtitle
- Padding: 48px 48px 32px, border-bottom: 1px solid #1a2a20

### Footer
- Font: Share Tech Mono, 9px, color #2a3a30, letter-spacing 2px
- Padding: 24px 48px, border-top: 1px solid #1a2a20

### Grid Layout
- display: grid
- grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))
- gap: 16px

### HUD Overlay
Full-viewport overlay with pointer-events: none containing:
- Scanlines layer
- 4 corner brackets (tl, tr, bl, br)
- Content blocks positioned absolute (title top-left, stats top-right, legend bottom-left, controls bottom-right)

## Voice & Tone

### // Prefix Convention
Eyebrow text, section labels, legend titles, and footers use the "//" prefix. Signals system commentary — framing/annotating, not informing. Examples: "// RV Power Systems", "// Materials", "// Diagrams"

### Case Rules
- Uppercase: eyebrows, section labels, page titles, stat labels
- Normal case: card titles, body text, descriptions, tooltip content

### Font Roles
- Share Tech Mono: HUD readouts — labels, stats, badges, eyebrows, footers, metadata
- Rajdhani: human content — titles, descriptions, body text

### Copy Style
- Terse technical fragments, not full sentences
- Em dashes (—) over commas for joining
- Middle dot (·) as inline separator: "SYSTEM A · SYSTEM B"
- No exclamation marks. No emoji. No casual language.

### Layout Philosophy
- Dark-first: background is a feature, not empty space. 48px page margins.
- Sparse grids: auto-fill responsive, ample gap. Content breathes.
- Layered depth: Base → Surface → Surface Hover. Elevation through background shifts, not shadows.
- Subtle interaction: 0.2s transitions, border shifts, gradient reveals. Nothing bounces.
- Scanlines always present on every page.
```

- [ ] **Step 2: Verify llms.txt is well-formed**

```bash
wc -l llms.txt
head -5 llms.txt
```

Expected: ~150-170 lines. First line is `# Rising Company Design System`.

- [ ] **Step 3: Commit**

```bash
git add llms.txt
git commit -m "feat: add llms.txt — machine-readable design system spec"
```

---

### Task 3: Create index.html

Polish the brainstorm mockup into the production visual reference page. This is the human-facing site at `design-system.rising.company`. It demonstrates all tokens, typography styles, and component patterns using the actual design system styles.

**Files:**
- Create: `index.html`

**Source:** The validated mockup at `.superpowers/brainstorm/93053-1777063665/content/tokens-preview.html` — already approved by the user. Copy it, then apply these refinements:

- [ ] **Step 1: Copy brainstorm mockup as starting point**

```bash
cp .superpowers/brainstorm/93053-1777063665/content/tokens-preview.html index.html
```

- [ ] **Step 2: Refine index.html**

Apply the following changes to the copied file:

1. Update the `<title>` to `Rising Company — Design System`
2. Update the eyebrow text to `// Rising Company`
3. Update the h1 to `Design System`
4. Update the subtitle to point to llms.txt: `Machine-readable spec available at design-system.rising.company/llms.txt`
5. Add the scanline overlay as `body::before` (already present — verify)
6. Add a link to `llms.txt` in the footer: `// rising-company design-system — <a href="/llms.txt">llms.txt</a>`
7. Style the footer link: `color: #3af0a0; text-decoration: none;` with hover underline

The page already contains all color swatches, typography samples, component demos (card, stats, tooltip, badges) that were validated in the brainstorm. No structural changes needed — just metadata refinements.

- [ ] **Step 3: Verify in browser**

```bash
open index.html
```

Verify: page loads, scanlines visible, all color swatches render, typography samples show correct fonts (Rajdhani + Share Tech Mono), card hover gradient works, footer link to llms.txt works.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add visual reference site"
```

---

### Task 4: Create skill file — rising-design.md

The main skill file. Contains core tokens and principles inline (~150-200 lines). Passive activation — invoked via `/rising-design`. Instructs the LLM to read `components.md` for detailed component anatomy.

**Files:**
- Create: `skills/rising-design/rising-design.md`

- [ ] **Step 1: Create directory**

```bash
mkdir -p skills/rising-design
```

- [ ] **Step 2: Write rising-design.md**

Create `skills/rising-design/rising-design.md`:

````markdown
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
````

- [ ] **Step 3: Commit**

```bash
git add skills/rising-design/rising-design.md
git commit -m "feat: add rising-design skill file"
```

---

### Task 5: Create component reference — components.md

Detailed HTML/CSS anatomy for every component pattern. Read on demand by the skill when building specific components.

**Files:**
- Create: `skills/rising-design/components.md`

- [ ] **Step 1: Write components.md**

Create `skills/rising-design/components.md` with full HTML + CSS for each component. Every component gets: a description, the complete HTML structure, and the complete CSS. Extracted directly from `../rv-diagrams/index.html` and `../rv-diagrams/battery-box.html`.

Components to include (with full HTML/CSS code blocks for each):

1. **Card** — from rv-diagrams `index.html` lines 91-177. Include: container, `::before` gradient bar, hover states, card-tag, card-title, card-desc, card-meta, card-arrow.

2. **Badge** — from rv-diagrams `index.html` lines 154-163.

3. **Stats Panel** — from rv-diagrams `battery-box.html` lines 136-158. Include: stat-row, stat-label, stat-value.

4. **Tooltip** — from rv-diagrams `battery-box.html` lines 206-234. Include: tt-name, tt-mat, tt-desc.

5. **Header** — from rv-diagrams `index.html` lines 41-68. Include: eyebrow, h1, subtitle paragraph.

6. **Footer** — from rv-diagrams `index.html` lines 179-186.

7. **HUD Overlay** — from rv-diagrams `battery-box.html` lines 35-203. Include: hud container, scanlines, corner brackets (tl/tr/bl/br), title-block, stats-panel, legend, controls-hint.

8. **Grid Layout** — from rv-diagrams `index.html` lines 85-89.

Each component section should follow this format:

```markdown
## Card

Description of the component and when to use it.

### HTML

\```html
<a class="card" href="...">
  ...full structure...
</a>
\```

### CSS

\```css
.card { ... }
.card::before { ... }
.card:hover { ... }
...
\```
```

- [ ] **Step 2: Commit**

```bash
git add skills/rising-design/components.md
git commit -m "feat: add component reference with full HTML/CSS anatomy"
```

---

### Task 6: Local verification

Verify all files work together before deployment.

**Files:** None created — verification only.

- [ ] **Step 1: Verify file structure**

```bash
find . -not -path './.git/*' -not -path './.superpowers/*' -not -name '.DS_Store' | sort
```

Expected output:
```
.
./.gitignore
./docs
./docs/superpowers
./docs/superpowers/plans
./docs/superpowers/plans/2026-04-24-rising-design-system.md
./docs/superpowers/specs
./docs/superpowers/specs/2026-04-24-rising-design-system.md
./index.html
./llms.txt
./skills
./skills/rising-design
./skills/rising-design/components.md
./skills/rising-design/rising-design.md
./vercel.json
```

- [ ] **Step 2: Verify index.html renders**

```bash
open index.html
```

Check: page loads with correct fonts, scanlines visible, all sections present, card hover works, footer llms.txt link works.

- [ ] **Step 3: Verify llms.txt is plain text**

```bash
file llms.txt
head -3 llms.txt
```

Expected: `llms.txt: UTF-8 Unicode text` (or similar). First line: `# Rising Company Design System`.

- [ ] **Step 4: Verify skill frontmatter**

```bash
head -4 skills/rising-design/rising-design.md
```

Expected:
```
---
name: rising-design
description: Rising Company design system — mission control / technical HUD aesthetic...
---
```

- [ ] **Step 5: Commit docs**

```bash
git add docs/
git commit -m "docs: add design spec and implementation plan"
```

---

### Task 7: Final commit and deployment readiness

- [ ] **Step 1: Verify git log**

```bash
git log --oneline
```

Expected: 5 commits in order:
```
docs: add design spec and implementation plan
feat: add component reference with full HTML/CSS anatomy
feat: add rising-design skill file
feat: add visual reference site
feat: add llms.txt — machine-readable design system spec
chore: init project with vercel config
```

- [ ] **Step 2: Inform user — ready for Vercel deployment**

The project is ready. Tell the user:
- Run `vercel` in the project directory to deploy
- Configure custom domain `design-system.rising.company` in Vercel dashboard
- The skill at `skills/rising-design/` can be installed into any Claude Code project by copying the directory or symlinking
