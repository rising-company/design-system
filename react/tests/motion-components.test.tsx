import { render, screen } from "@testing-library/react";
import { MotionConfigContext } from "motion/react";
import { useContext } from "react";
import { describe, expect, it } from "vitest";
import { MotionProvider, Reveal, RevealItem } from "../src/motion-components.js";
import { base } from "../src/motion.js";

function ReadConfig() {
  const config = useContext(MotionConfigContext);
  return <output data-reduced={config.reducedMotion} data-spring={JSON.stringify(config.transition)} />;
}

describe("MotionProvider", () => {
  it("honours the reader's reduced-motion setting and defaults to the Base spring", () => {
    render(<MotionProvider><ReadConfig /></MotionProvider>);
    const out = screen.getByRole("status");
    expect(out.dataset.reduced).toBe("user");
    expect(JSON.parse(out.dataset.spring!)).toEqual(base);
  });
});

describe("Reveal", () => {
  it("renders the items it staggers, as the element asked for", () => {
    render(
      <Reveal className="stack">
        <RevealItem as="section" aria-label="first">One</RevealItem>
        <RevealItem>Two</RevealItem>
      </Reveal>,
    );
    expect(screen.getByRole("region", { name: "first" }).tagName).toBe("SECTION");
    expect(screen.getByText("Two").tagName).toBe("DIV");
  });
});
