"use client";

import { Menu } from "@base-ui/react/menu";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { panel } from "./motion.js";

/**
 * Two letters for the initials chip — the identity that survives when the
 * email hides on a narrow bar. "ben.cao@…" → "BC", "ben@…" → "BE".
 */
export function initials(email: string): string {
  const local = email.split("@")[0] ?? "";
  if (!local) return "··";
  const parts = local.split(/[.\-_+]/).filter(Boolean);
  const letters = parts.length >= 2 ? parts.map((p) => p[0]).join("") : local.slice(0, 2);
  return letters.slice(0, 2).toUpperCase();
}

/**
 * The user menu from the App Shell (llms.txt → App Shell → user menu): an
 * initials chip, the email and a chevron open a panel with "Signed in as",
 * the product's account items, and Sign out last, ruled off.
 *
 * Behaviour is Base UI's Menu (ADR-0016): arrow keys and typeahead move
 * between items, Escape and an outside click close it, and focus goes back to
 * the trigger. The markup keeps rising.css's `.user-menu*` classes, so it
 * looks the same as the `<details>` build. The panel grows from its top-right
 * anchor on the Base spring and leaves fade-led (Motion → panel recipe).
 */
export function UserMenu({
  email,
  onSignOut,
  children,
}: {
  email: string;
  /** Sign out of id. The menu always renders it, last. */
  onSignOut: () => void;
  /** The product's account items — `<UserMenuLink>` / `<UserMenuItem>`. */
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  return (
    // Not modal: the page keeps scrolling and stays clickable, like the
    // <details> build. An outside click closes the menu.
    <Menu.Root open={open} onOpenChange={setOpen} modal={false}>
      <div className="user-menu" ref={container}>
        <Menu.Trigger className="user-menu-trigger" aria-label="Account menu">
          <span className="user-initials" aria-hidden="true">
            {initials(email)}
          </span>
          <span className="user-menu-email">{email}</span>
          <ChevronDown />
        </Menu.Trigger>
      </div>
      <AnimatePresence>
        {open && (
          // Portalled into .user-menu, not <body>: the panel stays inside the
          // app bar's landmark and follows its trigger in reading order.
          <Menu.Portal keepMounted container={container}>
            <Menu.Positioner side="bottom" align="end" sideOffset={8} style={{ zIndex: 70 }}>
              <Menu.Popup
                className="user-menu-panel"
                // rising.css places the panel under its <details>; here the
                // positioner places it, so the panel stays in flow inside it.
                style={{ position: "static", transformOrigin: "top right" }}
                render={<motion.div {...panel} />}
              >
                <Menu.Group>
                  <Menu.GroupLabel className="user-menu-head">
                    {/* The space keeps the group's accessible name two words apart. */}
                    <div className="section-label">{"// Signed in as"}</div>{" "}
                    <div className="user-menu-email">{email}</div>
                  </Menu.GroupLabel>
                  {children}
                  <Menu.Item className="user-menu-item user-menu-signout" onClick={onSignOut}>
                    Sign out
                  </Menu.Item>
                </Menu.Group>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        )}
      </AnimatePresence>
    </Menu.Root>
  );
}

/**
 * A link in the user menu. In Next.js pass the router's link through
 * `render`: `<UserMenuLink render={<Link href="/settings" />}>Settings</UserMenuLink>`.
 */
export function UserMenuLink({ className, ...props }: Menu.LinkItem.Props) {
  return <Menu.LinkItem closeOnClick className={join("user-menu-item", className)} {...props} />;
}

/** An action in the user menu that isn't a link (it runs on click). */
export function UserMenuItem({ className, ...props }: Menu.Item.Props) {
  return <Menu.Item className={join("user-menu-item", className)} {...props} />;
}

function join(base: string, extra: unknown) {
  return typeof extra === "string" && extra ? `${base} ${extra}` : base;
}

/**
 * Lucide chevron-down, inline so the package needs no sprite. The width,
 * height and stroke attributes draw it on a product without the `.icon`
 * rules; where they exist, CSS wins and squares the ends the same way.
 */
function ChevronDown() {
  return (
    <svg
      className="icon icon-sm user-menu-chevron"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
