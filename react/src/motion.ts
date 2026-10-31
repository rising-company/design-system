import type { Transition, Variants } from "motion/react";

/**
 * The motion scale (design system → Motion). Durations and curves are a scale,
 * like spacing: every animation picks from here and nothing invents a value.
 * Springs move, tweens fade, nothing bounces.
 */

/** Base — anything that moves or resizes: menus, panels, drawers, toasts, rows, layout. */
export const base = { type: "spring", visualDuration: 0.3, bounce: 0 } as const satisfies Transition;

/** Slow — whole surfaces: the page reveal, route changes, a modal and its scrim. */
export const slow = { type: "spring", visualDuration: 0.5, bounce: 0 } as const satisfies Transition;

/** Quick — opacity and color. Hover, focus and color states stay in CSS at 0.2s. */
export const quick = { duration: 0.2, ease: "easeOut" } as const satisfies Transition;

/** Exits are about 0.6× the entry and fade-led — nothing pops out of existence. */
export const exitTween = { duration: 0.15 } as const satisfies Transition;

/**
 * Panel / menu / popover / toast: grows from its anchor — set `transformOrigin`
 * to the anchor's corner. Conditionally rendered, so it sits in AnimatePresence.
 */
export const panel = {
  initial: { opacity: 0, y: 4, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 4, transition: exitTween },
} as const;

/** Enter / reveal for a section, card or toast: 8px up with opacity. */
export const enter = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, transition: exitTween },
} as const;

/**
 * Load reveal — the page's one entrance. The container staggers; each item
 * fades up 8px on the Slow spring. Keep it to a handful of items per view so
 * the whole sequence stays under 600ms.
 */
export const reveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
} as const satisfies Variants;

export const revealItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: slow },
} as const satisfies Variants;
