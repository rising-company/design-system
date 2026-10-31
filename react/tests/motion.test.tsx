import { describe, expect, it } from "vitest";
import { base, exitTween, quick, slow, panel, enter, reveal, revealItem } from "../src/motion.js";

describe("motion scale", () => {
  it("springs move without bouncing: Base 0.3s, Slow 0.5s", () => {
    expect(base).toEqual({ type: "spring", visualDuration: 0.3, bounce: 0 });
    expect(slow).toEqual({ type: "spring", visualDuration: 0.5, bounce: 0 });
  });

  it("tweens fade: Quick is 0.2s, exits are faster at 0.15s", () => {
    expect(quick).toEqual({ duration: 0.2, ease: "easeOut" });
    expect(exitTween).toEqual({ duration: 0.15 });
  });

  it("panels grow 4px from their anchor and leave fading on the exit tween", () => {
    expect(panel.initial).toEqual({ opacity: 0, y: 4, scale: 0.98 });
    expect(panel.exit).toEqual({ opacity: 0, y: 4, transition: exitTween });
  });

  it("an entrance rises 8px and leaves fading only", () => {
    expect(enter.initial).toEqual({ opacity: 0, y: 8 });
    expect(enter.exit).toEqual({ opacity: 0, transition: exitTween });
  });

  it("the load reveal staggers 90ms and each item rises on Slow", () => {
    expect(reveal.show).toEqual({ transition: { staggerChildren: 0.09 } });
    expect(revealItem.show).toEqual({ opacity: 1, y: 0, transition: slow });
  });
});
