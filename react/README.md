# @rising/ui

The Rising Company design system's React components: the parts that carry
behaviour, so each product stops rebuilding them. They render the markup and
classes in [`llms.txt`](https://design-system.rising.company/llms.txt) and ship
no CSS; the product carries the matching `rising.css` rules.

```bash
npm i https://design-system.rising.company/ui/rising-ui-0.1.0.tgz
```

| Import | What it is |
|---|---|
| `@rising/ui/motion` | The motion scale and recipes. Plain values, safe on the server. |
| `@rising/ui/motion-components` | `MotionProvider`, `Reveal`, `RevealItem`. |
| `@rising/ui/user-menu` | `UserMenu`, `UserMenuLink`, `UserMenuItem`, `initials`. |

Peer dependencies: `react@^19`, `react-dom@^19`, `motion@^13.4 || ^14`.

## Rules for a new component (ADR-0016)

1. **Native first.** If a native element does the job with no script (`<dialog>`,
   a checkbox with `role="switch"`, radios), the system ships CSS and markup and
   there is no React wrapper.
2. **Otherwise Base UI.** Focus, keyboard, ARIA and positioning come from
   `@base-ui/react`. Don't hand-roll a focus trap or a roving tabindex.
3. **Motion through `render`.** Animate with Motion on the scale in
   `src/motion.ts`, using Base UI's `render` prop; for a popup that unmounts,
   control `open`, wrap the portal in `AnimatePresence` and pass `keepMounted`.
   Exits fade, so Base UI detects them.
4. **rising.css classes, no new CSS here.** A component that needs a new rule
   adds it to `rising.css` and `llms.txt` first.
5. **Red, green, then refactor** — `tests/` on jsdom with Testing Library.

## Releasing

```bash
# bump "version" in package.json, then
npm run release   # test, typecheck, build, pack → ../ui/rising-ui-<version>.tgz
```

Commit the tarball. A published version is never overwritten: products pin its
URL, and npm checks its integrity hash.
