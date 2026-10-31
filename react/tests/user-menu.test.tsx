import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { UserMenu, UserMenuLink, initials } from "../src/user-menu.js";

const EMAIL = "ben.cao@rising.company";

function renderMenu(onSignOut = vi.fn()) {
  // In the App Shell the menu sits in the app bar, a <header> landmark.
  render(
    <header>
      <UserMenu email={EMAIL} onSignOut={onSignOut}>
        <UserMenuLink href="/settings">Settings</UserMenuLink>
      </UserMenu>
    </header>,
  );
  return { onSignOut, trigger: screen.getByRole("button", { name: "Account menu" }) };
}

describe("UserMenu", () => {
  it("shows the initials chip and the email on a closed trigger", () => {
    const { trigger } = renderMenu();
    expect(trigger.className).toContain("user-menu-trigger");
    expect(trigger.querySelector(".user-initials")?.textContent).toBe("BC");
    expect(trigger.querySelector(".user-menu-email")?.textContent).toBe(EMAIL);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("opens a menu labelled with who is signed in", async () => {
    const { trigger } = renderMenu();
    await userEvent.click(trigger);
    const menu = await screen.findByRole("menu");
    expect(menu.className).toContain("user-menu-panel");
    expect(screen.getByRole("group", { name: `// Signed in as ${EMAIL}` })).toBeTruthy();
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("lists the product's items, then Sign out last", async () => {
    const { trigger } = renderMenu();
    await userEvent.click(trigger);
    const items = await screen.findAllByRole("menuitem");
    expect(items.map((i) => i.textContent)).toEqual(["Settings", "Sign out"]);
    expect(items[0]!.getAttribute("href")).toBe("/settings");
    expect(items[1]!.className).toContain("user-menu-signout");
  });

  it("signs out and closes when Sign out is chosen", async () => {
    const { trigger, onSignOut } = renderMenu();
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole("menuitem", { name: "Sign out" }));
    expect(onSignOut).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });

  it("opens from the keyboard on the first item and wraps with the arrow keys", async () => {
    const { trigger } = renderMenu();
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await screen.findByRole("menu");
    // Opened from the keyboard, the first item takes focus (APG menu button).
    await waitFor(() => expect(document.activeElement?.textContent).toBe("Settings"));
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => expect(document.activeElement?.textContent).toBe("Sign out"));
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => expect(document.activeElement?.textContent).toBe("Settings"));
  });

  it("closes on Escape and gives focus back to the trigger", async () => {
    const { trigger } = renderMenu();
    await userEvent.click(trigger);
    await screen.findByRole("menu");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    expect(document.activeElement).toBe(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
});

describe("UserMenu accessibility (ADR-0011)", () => {
  it("has no axe violations closed or open", async () => {
    const { trigger } = renderMenu();
    expect((await axe.run(document.body)).violations).toEqual([]);
    await userEvent.click(trigger);
    await screen.findByRole("menu");
    expect((await axe.run(document.body)).violations).toEqual([]);
  });
});

describe("initials", () => {
  it("takes one letter per part of the address, or the first two", () => {
    expect(initials("ben.cao@rising.company")).toBe("BC");
    expect(initials("ben-cao@rising.company")).toBe("BC");
    expect(initials("ben@rising.company")).toBe("BE");
    expect(initials("@rising.company")).toBe("··");
  });
});

