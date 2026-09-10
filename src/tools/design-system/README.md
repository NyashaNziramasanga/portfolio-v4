# Portfolio design system

The tool is registered as `/tools/design-system`. `DesignSystem.tsx` owns accessible
category navigation; `Panels.tsx` uses shared components and token specimens.
`TokenTable.tsx` renders aligned token/value/example/description rows with clickable values. `CopyValue.tsx` reveals a copy icon on hover or
keyboard focus and copies the displayed value, with accessible feedback.
Editorial descriptions and category ordering live in `data/content.json`.

Run `bun run tokens:generate` after changing the token catalog. The build does this
automatically; the Vite plugin regenerates on startup and token-file changes.
Commit both generated files with source changes. Do not edit them manually.

`scripts/design-system.mjs` reads TypeScript AST declarations from the focused
StyleX modules. It emits literal display values and static StyleX references for
specimens. Font recipe metadata resolves references from the same catalog. It
never evaluates source code. Unsupported expressions fail the build and show a
development error instead of silently presenting stale documentation.

The component previews use the real Button variants, sizes, and disabled states.
Tables enable example and description columns only where useful content exists.
