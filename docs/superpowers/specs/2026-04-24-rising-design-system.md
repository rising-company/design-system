# Rising Company Design System — Spec

## Overview

A design system extracted from [rv-diagrams](../../../rv-diagrams) that serves three audiences through one source of truth:

1. **Humans** — visual reference site at `design-system.rising.company`
2. **LLMs (web)** — structured spec at `design-system.rising.company/llms.txt`
3. **Claude Code** — passive skill invoked via `/rising-design`, loads core principles inline, reads component details on demand

The aesthetic is "mission control / technical HUD" — dark backgrounds, monospace system labels, mint-green accents, scanline textures, generous spacing.

## Deliverables

```
design-system/
├── index.html                 # Visual reference site (tokens, typography, components)
├── llms.txt                   # Machine-readable design system for LLMs
├── vercel.json                # Vercel deployment config
├── skills/
│   └── rising-design/
│       ├── rising-design.md   # Skill file — core principles inline, passive activation
│       └── components.md      # Detailed component recipes (read on demand)
```

## Design Tokens

### Color Palette

**Backgrounds:**
| Name          | Hex       | Usage                              |
|---------------|-----------|-------------------------------------|
| Base          | `#0a0c10` | Page background, scene background   |
| Surface       | `#0d1117` | Cards, panels, elevated containers  |
| Surface Hover | `#0f1520` | Card/panel hover state              |
| Inset         | `#0a1410` | Badge backgrounds, recessed areas   |

**Borders:**
| Name           | Hex       | Usage                              |
|----------------|-----------|-------------------------------------|
| Border Default | `#1a2a20` | Card borders, dividers, separators  |
| Border Hover   | `#2a4a38` | Card hover borders                  |
| Border Subtle  | `#1a3020` | Badge borders, faint separators     |
| Grid Line      | `#111820` | Background grid, structural lines   |

**Text:**
| Name    | Hex       | Usage                                        |
|---------|-----------|-----------------------------------------------|
| Heading | `#e8f4ff` | Page titles, card titles, tooltip names       |
| Body    | `#c8d8e8` | Primary body text, legend labels              |
| Muted   | `#6a8a80` | Card descriptions, secondary body text        |
| Subtle  | `#4a6a5a` | Subtitles, secondary mono text                |
| Label   | `#3a5a50` | Section titles, stat labels, control hints    |
| Dim     | `#2a3a30` | Footer text, lowest-emphasis content          |

**Accents:**
| Name              | Hex       | Usage                                    |
|-------------------|-----------|-------------------------------------------|
| Primary (Mint)    | `#3af0a0` | Eyebrows, stat values, active highlights  |
| Secondary (Blue)  | `#2a7adf` | Gradient endpoints, battery accent        |
| Danger (Red)      | `#cc2200` | Positive cables, error/danger states      |
| Warning (Amber)   | `#ddaa30` | Terminals, warning/caution states         |

**Accent Derivatives:**
| Token                | Value              | Usage                    |
|----------------------|--------------------|--------------------------|
| Primary @ 25% alpha  | `#3af0a040`        | Corner bracket borders   |
| Primary @ 31% alpha  | `#3af0a050`        | Tooltip borders          |
| Gradient             | `#3af0a0 → #2a7adf` | Card hover top-border  |

### Typography

**Font Families:**
- **Display/Content:** `"Rajdhani", sans-serif` — weights 300 (light), 500 (medium), 700 (bold)
- **System/Technical:** `"Share Tech Mono", monospace`
- **Google Fonts import:** `https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;500;700&display=swap`

**Text Styles:**

| Style Name      | Family          | Size | Weight | Letter-Spacing | Transform | Color     |
|-----------------|-----------------|------|--------|----------------|-----------|-----------|
| Eyebrow         | Share Tech Mono | 10px | —      | 4px            | uppercase | `#3af0a0` |
| Page Title      | Rajdhani        | 36px | 700    | 3px            | uppercase | `#e8f4ff` |
| Section Heading | Rajdhani        | 28px | 700    | 2px            | —         | `#e8f4ff` |
| Card Title      | Rajdhani        | 20px | 700    | 1px            | —         | `#e8f4ff` |
| Body            | Rajdhani        | 13px | 400    | —              | —         | `#6a8a80` |
| Stat Value      | Share Tech Mono | 16px | —      | 1px            | —         | `#3af0a0` |
| Subtitle        | Share Tech Mono | 11px | —      | 2px            | —         | `#4a6a5a` |
| Section Label   | Share Tech Mono | 9px  | —      | 4px            | uppercase | `#3a5a50` |
| Badge Text      | Share Tech Mono | 9px  | —      | 1px            | —         | `#3a5a50` |
| Footer          | Share Tech Mono | 9px  | —      | 2px            | —         | `#2a3a30` |

### Spacing

| Token  | Value | Usage                                    |
|--------|-------|-------------------------------------------|
| Page   | 48px  | Header, main, and side padding            |
| Section| 32px  | Between major sections                    |
| Element| 24px  | Card padding, footer vertical padding     |
| Grid   | 16px  | Grid gap between cards                    |
| Inline | 12px  | Gap between badges, small element spacing |
| Tight  | 8px   | Between related text elements             |

### Border Radius

| Token   | Value | Usage                          |
|---------|-------|--------------------------------|
| Card    | 6px   | Cards, panels, swatches        |
| Badge   | 3px   | Badges, small tags, swatches   |
| Tooltip | 4px   | Tooltips, floating elements    |

### Transitions

All interactive transitions use `0.2s` with default easing. Properties commonly transitioned: `border-color`, `background`, `color`, `opacity`.

### Visual Effects

**Scanlines (signature texture):**
```css
background: repeating-linear-gradient(
  to bottom,
  transparent 0px,
  transparent 3px,
  rgba(0, 0, 0, 0.04) 3px,
  rgba(0, 0, 0, 0.04) 4px
);
```
Applied as a fixed overlay (`position: fixed; inset: 0; pointer-events: none; z-index: 100`) on every page.

**Corner Brackets:**
32x32px L-shaped borders at each corner of the viewport, using `Primary @ 25% alpha` (`#3af0a040`). Positioned 16px from edges.

**Card Hover Gradient:**
2px-tall bar at top of card, `linear-gradient(90deg, #3af0a0, #2a7adf)`, hidden by default (`opacity: 0`), revealed on hover.

## Component Patterns

Detailed component anatomy lives in `skills/rising-design/components.md`. Summary:

### Card
- Container: Surface bg, Border Default, 6px radius, 24px padding
- Hover: Surface Hover bg, Border Hover, gradient top-bar reveals
- Structure: eyebrow tag → title → description → badge row
- Arrow indicator at bottom-right (mono, `→`, dim → accent on hover)

### Badge
- Share Tech Mono, 9px, 1px letter-spacing
- Inset bg, Border Subtle, 3px radius, 3px 7px padding

### Stats Panel
- Vertical stack of stat rows (label above value)
- Label: Section Label style
- Value: Stat Value style (mint accent)

### Tooltip
- Semi-transparent Base bg (`rgba(10, 12, 16, 0.92)`)
- Primary @ 31% alpha border, 4px radius
- Structure: name (heading weight) → material line (mono, mint) → description (muted)

### Header
- Eyebrow → Page Title → Subtitle
- 48px padding, bottom border (Border Default)

### Footer
- Mono text, Dim color, 2px letter-spacing
- 24px vertical / 48px horizontal padding, top border

### Grid Layout
- `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- 16px gap

## Voice & Tone

### The `//` Prefix Convention
Used on eyebrow text, section labels, legend titles, and footers. Signals "system commentary" — content that frames or annotates rather than informs. Examples: `// RV Power Systems`, `// Materials`, `// Diagrams`.

### Text Case Rules
- **Uppercase:** Eyebrows, section labels/titles, page titles, stat labels
- **Normal case:** Card titles, body text, descriptions, tooltip content

### Font Role Assignment
- **Share Tech Mono** for anything that feels like a HUD readout: labels, stats, badges, eyebrows, footers, metadata
- **Rajdhani** for anything a human reads as content: titles, descriptions, body text

### Copy Style
- Terse, technical fragments over full sentences
- Em dashes (`—`) over commas for joining clauses
- Middle dot (`·`) as a separator in inline lists: `"3D COMPONENT MAP · DRAG TO ROTATE"`
- No exclamation marks. No emoji. No casual language.

### Layout Philosophy
- **Dark-first:** The dark background is a feature, not empty space. Generous padding (48px page margins).
- **Sparse grids:** Auto-fill responsive grids with ample gap. Content breathes.
- **Layered depth:** Base → Surface → Surface Hover. Subtle elevation through background shifts, not shadows.
- **Subtle interaction:** 0.2s transitions, border color shifts, gradient reveals. Nothing jumps, bounces, or draws attention away from content.
- **Scanlines always present:** The repeating-gradient overlay is a signature texture on every page.

## Skill Architecture

### Activation

**Passive.** The skill does not auto-trigger. It is invoked:
- Explicitly by the user via `/rising-design`
- By other skills or agents that reference it (e.g., `frontend-design` could call it)
- By an LLM fetching `design-system.rising.company/llms.txt` from the web

### Main Skill File (`rising-design.md`)

Contains inline (~150-200 lines):
- Identity statement
- Full color token table
- Typography specs
- Spacing scale
- Visual effects (scanlines, corners, gradient hover)
- Voice/tone rules
- Layout principles
- Instruction to read `components.md` when building specific components
- Instruction to WebFetch `design-system.rising.company/llms.txt` when working outside Claude Code

### Component Reference (`components.md`)

Read on demand when building specific components. Contains full HTML/CSS anatomy for:
- Card (with hover states)
- Badge
- Stats panel
- Tooltip
- Header / Footer
- HUD overlay with corner brackets
- Grid system

### `llms.txt`

Plain-text file at `design-system.rising.company/llms.txt` following the emerging llms.txt convention. Contains the complete design system spec (all tokens, component patterns, layout rules, voice/tone) in a structured markdown format optimized for LLM consumption. This is the canonical machine-readable reference — the skill file is a lightweight pointer to it.

## Deployment

**Platform:** Vercel
**Domain:** `design-system.rising.company`
**Config:** `vercel.json` with static file serving, clean URLs

Static files served:
- `/` → `index.html` (visual reference)
- `/llms.txt` → `llms.txt` (LLM spec)
