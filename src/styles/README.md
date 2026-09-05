# StyleX design tokens

This directory is the shared source of truth for the portfolio's visual values.
The modules preserve the existing dark design; they organize it without changing
the scale or introducing a second theme.

## Catalog

| Module | Export | Purpose |
| --- | --- | --- |
| `Colors.stylex.ts` | `colors` | Semantic background, surface, text, border, accent, feedback, overlay, and media colors |
| `Spacing.stylex.ts` | `spacing` | Pixel spacing constants named by their rendered value |
| `BorderRadius.stylex.ts` | `radii` | Shared corner-radius scale |
| `Typography.stylex.ts` | `fontFamilies`, `fontSizes`, `fontWeights`, `lineHeights`, `letterSpacing` | Type families and scales |
| `Fonts.stylex.ts` | `fonts` | Pre-composed semantic font recipes built from the typography primitives |
| `Motion.stylex.ts` | `motion` | Durations, easing curves, and motion-preference queries |
| `Breakpoints.stylex.ts` | `breakpoints` | Mobile-first responsive queries, including the 768 px tool layout |
| `Shadows.stylex.ts` | `shadows` | Elevation, focus rings, inset, and media shadows |
| `Layout.stylex.ts` | `layout` | Shared widths, touch target, and stacking levels |
| `BrandColors.stylex.ts` | `brandColors` | Fixed colors owned by third-party brands |

## Usage

Import from the defining module. Do not add a barrel file: StyleX must statically
resolve named exports from `.stylex.ts` files, and compiler re-exports are unsafe.

```tsx
import * as stylex from "@stylexjs/stylex";
import { colors } from "@/styles/Colors.stylex";
import { spacing } from "@/styles/Spacing.stylex";

const styles = stylex.create({
  card: {
    gap: spacing.space12,
    padding: spacing.space16,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
});
```

Choose semantic tokens when a value communicates UI intent. For example, use
`colors.textMuted` for supporting copy and `colors.surface` for a raised surface
instead of selecting a palette shade by appearance. Use
`brandColors` only when the external brand owns the color.

Spacing names deliberately include their pixel value (`space12`, `space24`) so a
preserved measurement stays unambiguous. Prefer these tokens for layout rhythm.
Unique component geometry—such as SVG coordinates, illustration sizes, or a
single alignment correction—may remain next to the component with a short lint
exception explaining why it is not a reusable token.

For ordinary text, start with a semantic recipe from `Fonts.stylex.ts` and apply
component styles afterward. Use the primitive typography exports directly when
the type changes responsively or a recipe would obscure a deliberate exception.

## Enforcement

ESLint rejects raw values in StyleX definitions for colors, shadows, spacing,
radii, typography, motion timing, breakpoints, and z-indexes. Structural values
such as `0`, percentages, `auto`, grid tracks, opacity, flex values, and
component-specific dimensions remain local. ESLint also requires StyleX object
properties to be formatted vertically, one property per line.

`src/index.css` is the deliberate bootstrap exception. Its pre-render body and
scrollbar colors mirror this catalog because plain CSS cannot import StyleX's
generated variable names. Keep that file limited to fonts, reset, and
document-level behavior.
