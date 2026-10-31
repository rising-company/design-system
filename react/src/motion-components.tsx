"use client";

import { motion, MotionConfig, type HTMLMotionProps } from "motion/react";
import { base, reveal, revealItem } from "./motion.js";

/**
 * Wraps the app root once (design system → Motion): the Base spring is the
 * default transition, and `reducedMotion="user"` turns transform and layout
 * animation off for people who asked for it while keeping opacity — the same
 * contract as the prefers-reduced-motion block in rising.css.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={base}>
      {children}
    </MotionConfig>
  );
}

/**
 * The load reveal: one entrance per view. Mount it where a view begins (a
 * route group's template.tsx, so it replays on navigation) and mark the
 * blocks that fade up with <RevealItem>; they stagger in document order.
 */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="show" variants={reveal} className={className}>
      {children}
    </motion.div>
  );
}

const tags = { div: motion.div, section: motion.section, p: motion.p, form: motion.form } as const;
type Tag = keyof typeof tags;

export function RevealItem<T extends Tag = "div">({
  as,
  ...props
}: { as?: T } & HTMLMotionProps<T>) {
  const Tag = tags[as ?? "div"] as unknown as React.ComponentType<HTMLMotionProps<T>>;
  return <Tag variants={revealItem} {...(props as HTMLMotionProps<T>)} />;
}
