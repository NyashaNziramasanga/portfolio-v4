import { useState, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Button,
  type ButtonVariant,
  type ButtonSize,
} from "@/components/ui/button";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { fonts } from "../../styles/Fonts.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { motion } from "../../styles/Motion.stylex";
import { layout } from "../../styles/Layout.stylex";
import tokens from "./data/tokens.generated.json";
import content from "./data/content.json";
import { specimens } from "./specimens.generated";
import { TokenRow, TokenTable } from "./TokenTable";

type SpecimenName = keyof typeof specimens;
function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section {...stylex.props(styles.group)}>
      <h2 {...stylex.props(fonts.title)}>{title}</h2>
      {children}
    </section>
  );
}
function ColorToken({ name }: { name: string }) {
  const value = tokens.colors[name as keyof typeof tokens.colors];
  const usage =
    content.usage[name as keyof typeof content.usage] ??
    (name.includes("Alpha") || name.includes("overlay")
      ? "A translucent layer; its appearance depends on the surface underneath."
      : "A supporting color for media, controls, or utility details.");
  return (
    <TokenRow name={`colors.${name}`} value={value} usage={usage}>
      <div
        {...stylex.props(
          styles.swatch,
          specimens[`colors.${name}` as SpecimenName],
        )}
      />
    </TokenRow>
  );
}
export function ColorsPanel() {
  const core = new Set(content.colorGroups.flatMap((group) => group.names));
  return (
    <>
      {content.colorGroups.map((group) => (
        <Group key={group.title} title={group.title}>
          <TokenTable showDescription>
            {group.names.map((name) => (
              <ColorToken key={name} name={name} />
            ))}
          </TokenTable>
        </Group>
      ))}
      <details {...stylex.props(styles.details)}>
        <summary {...stylex.props(fonts.title, styles.summary)}>
          Advanced · overlays, media & utility colors
        </summary>
        <TokenTable>
          {Object.keys(tokens.colors).map((name) =>
            core.has(name) ? null : <ColorToken key={name} name={name} />,
          )}
        </TokenTable>
      </details>
    </>
  );
}
export function SpacingPanel() {
  return (
    <>
      <div {...stylex.props(styles.context)}>
        <h3 {...stylex.props(fonts.title)}>Padding and gaps</h3>
        <div {...stylex.props(styles.paddingExample)}>
          <span {...stylex.props(styles.exampleDot)} />
          <p {...stylex.props(fonts.body)}>
            {tokens.spacing.md} px padding · {tokens.spacing.xs} px gap
          </p>
        </div>
        <p {...stylex.props(fonts.bodySmall, styles.muted)}>
          The blue area shows spacing.md padding. The dot and label are
          separated by spacing.xs.
        </p>
      </div>
      <Group title="The spacing scale">
        <TokenTable>
          {Object.entries(tokens.spacing).map(([name, value]) => (
            <TokenRow key={name} name={`spacing.${name}`} value={`${value}px`}>
              <div {...stylex.props(styles.measure)}>
                <div
                  {...stylex.props(
                    styles.bar,
                    specimens[`spacing.${name}` as SpecimenName],
                  )}
                />
              </div>
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
      <Group title="Layout & structure">
        <TokenTable showExample={false}>
          {Object.entries(tokens.layout).map(([name, value]) => (
            <TokenRow
              key={name}
              name={`layout.${name}`}
              value={name.startsWith("z") ? value : `${value}px`}
            />
          ))}
        </TokenTable>
      </Group>
      <Group title="Responsive breakpoints">
        <TokenTable showExample={false}>
          {Object.entries(tokens.breakpoints).map(([name, value]) => (
            <TokenRow key={name} name={`breakpoints.${name}`} value={value} />
          ))}
        </TokenTable>
      </Group>
    </>
  );
}
const recipes = [
  { name: "heading", style: fonts.heading, text: "Designed for clarity" },
  {
    name: "body",
    style: fonts.body,
    text: "Small details make a consistent interface. This is the everyday reading style used across the portfolio.",
  },
  { name: "caption", style: fonts.caption, text: "A supporting label" },
  { name: "mono", style: fonts.mono, text: "const gap = spacing.md;" },
] as const;
export function TypographyPanel() {
  return (
    <>
      <Group title="Type recipes">
        <TokenTable>
          {recipes.map((recipe) => (
            <TokenRow
              key={recipe.name}
              name={`fonts.${recipe.name}`}
              value={`${tokens.fonts[recipe.name].fontSize}px / ${tokens.fonts[recipe.name].lineHeight} · ${tokens.fonts[recipe.name].fontWeight}`}
            >
              <p {...stylex.props(recipe.style, styles.sampleText)}>
                {recipe.text}
              </p>
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
      <Group title="Type scale">
        <TokenTable>
          {Object.entries(tokens.fontSizes).map(([name, value]) => (
            <TokenRow
              key={name}
              name={`fontSizes.${name}`}
              value={`${value}px`}
            >
              <p
                {...stylex.props(
                  styles.sampleText,
                  specimens[`fontSizes.${name}` as SpecimenName],
                )}
              >
                Aa
              </p>
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
      {(
        [
          ["Font families", "fontFamilies"],
          ["Weights", "fontWeights"],
          ["Line heights", "lineHeights"],
          ["Letter spacing", "letterSpacing"],
        ] as const
      ).map(([title, group]) => (
        <Group key={group} title={title}>
          <TokenTable>
            {Object.entries(tokens[group]).map(([name, value]) => (
              <TokenRow key={name} name={`${group}.${name}`} value={value}>
                <p
                  {...stylex.props(
                    fonts.body,
                    styles.sampleText,
                    specimens[`${group}.${name}` as SpecimenName],
                  )}
                >
                  Clear, consistent type
                </p>
              </TokenRow>
            ))}
          </TokenTable>
        </Group>
      ))}
    </>
  );
}
export function ShapePanel() {
  return (
    <>
      <Group title="Corner radii">
        <TokenTable>
          {Object.entries(tokens.radii).map(([name, value]) => (
            <TokenRow
              key={name}
              name={`radii.${name}`}
              value={typeof value === "number" ? `${value}px` : value}
            >
              <div
                {...stylex.props(
                  styles.shape,
                  specimens[`radii.${name}` as SpecimenName],
                )}
              />
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
      <Group title="Elevation & focus">
        <TokenTable>
          {Object.entries(tokens.shadows).map(([name, value]) => (
            <TokenRow key={name} name={`shadows.${name}`} value={value}>
              <div {...stylex.props(styles.shadowStage)}>
                <div
                  {...stylex.props(
                    styles.shadowSample,
                    specimens[`shadows.${name}` as SpecimenName],
                  )}
                >
                  Surface
                </div>
              </div>
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
      <div {...stylex.props(styles.context)}>
        <h3 {...stylex.props(fonts.title)}>Try keyboard focus</h3>
        <p {...stylex.props(fonts.body, styles.muted)}>
          Press Tab to focus this button and see the shared focus ring.
        </p>
        <Button variant="secondary" style={styles.touch}>
          Focus example
        </Button>
      </div>
    </>
  );
}
const durationStyles = stylex.create({
  fast: {
    transitionDuration: {
      default: motion.fast,
      [motion.reduce]: motion.instant,
    },
  },
  normal: {
    transitionDuration: {
      default: motion.normal,
      [motion.reduce]: motion.instant,
    },
  },
  slow: {
    transitionDuration: {
      default: motion.slow,
      [motion.reduce]: motion.instant,
    },
  },
});
const easingStyles = stylex.create({
  easeOut: {
    transitionTimingFunction: motion.easeOut,
  },
  easeInOut: {
    transitionTimingFunction: motion.easeInOut,
  },
  pulseEasing: {
    transitionTimingFunction: motion.pulseEasing,
  },
});
export function MotionPanel() {
  const [moved, setMoved] = useState(false);
  return (
    <>
      <div {...stylex.props(styles.context)}>
        <h3 {...stylex.props(fonts.title)}>Compare transitions</h3>
        <p {...stylex.props(fonts.body, styles.muted)}>
          Play to move the markers, then play again to return. With reduced
          motion enabled, the change is instant.
        </p>
        <Button
          style={styles.touch}
          onClick={() => setMoved((value) => !value)}
        >
          Play transitions
        </Button>
      </div>
      <Group title="Duration">
        <TokenTable>
          {(["fast", "normal", "slow"] as const).map((name) => (
            <TokenRow
              key={name}
              name={`motion.${name}`}
              value={tokens.motion[name]}
            >
              <div {...stylex.props(styles.track)}>
                <div
                  {...stylex.props(
                    styles.runner,
                    durationStyles[name],
                    moved && styles.moved,
                  )}
                />
              </div>
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
      <Group title="Easing">
        <TokenTable>
          {(["easeOut", "easeInOut", "pulseEasing"] as const).map((name) => (
            <TokenRow
              key={name}
              name={`motion.${name}`}
              value={tokens.motion[name]}
            >
              <div {...stylex.props(styles.track)}>
                <div
                  {...stylex.props(
                    styles.runner,
                    durationStyles.slow,
                    easingStyles[name],
                    moved && styles.moved,
                  )}
                />
              </div>
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
      <Group title="Preferences & animation timing">
        <TokenTable showExample={false}>
          {(
            [
              "instant",
              "pulseDuration",
              "floatDuration",
              "reduce",
              "allow",
            ] as const
          ).map((name) => (
            <TokenRow
              key={name}
              name={`motion.${name}`}
              value={tokens.motion[name]}
            />
          ))}
        </TokenTable>
      </Group>
    </>
  );
}
const variants: ButtonVariant[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
];
const sizes: ButtonSize[] = ["sm", "default", "lg", "icon"];
export function ComponentsPanel() {
  return (
    <>
      <Group title="Button variants">
        <TokenTable
          label="Button variants"
          headings={["Component", "Variant", "Example"]}
        >
          {variants.map((variant) => (
            <TokenRow key={variant} name="Button" value={variant}>
              <div>
                <Button variant={variant}>{variant}</Button>
              </div>
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
      <Group title="Sizes">
        <TokenTable
          label="Button sizes"
          headings={["Component", "Size", "Example"]}
        >
          {sizes.map((size) => (
            <TokenRow key={size} name="Button" value={size}>
              <div>
                <Button
                  size={size}
                  aria-label={
                    size === "icon" ? "Icon button example" : undefined
                  }
                >
                  {size === "icon" ? "+" : size}
                </Button>
              </div>
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
      <Group title="Disabled state">
        <TokenTable
          label="Disabled buttons"
          headings={["Component", "Variant", "Example"]}
        >
          {variants.map((variant) => (
            <TokenRow key={variant} name="Button · disabled" value={variant}>
              <div>
                <Button variant={variant} disabled>
                  {variant}
                </Button>
              </div>
            </TokenRow>
          ))}
        </TokenTable>
      </Group>
    </>
  );
}
const styles = stylex.create({
  group: {
    marginBottom: spacing.lg,
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
  },
  swatch: {
    width: 64,
    height: 24,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.borderAlpha50,
  },
  context: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing.xs,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
  },
  muted: {
    color: colors.textMuted,
  },
  touch: {
    minHeight: layout.touchTarget,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: colors.borderAlpha40,
    paddingTop: spacing.lg,
  },
  summary: {
    cursor: "pointer",
    paddingBlock: spacing.md,
    minHeight: layout.touchTarget,
    color: colors.textSecondary,
  },
  measure: {
    height: 24,
    display: "flex",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bar: {
    height: 20,
    backgroundColor: colors.accentSurface,
    borderRadius: radii.xxs,
  },
  paddingExample: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.accentSurfaceAlpha20,
    borderWidth: 1,
    borderColor: colors.accentSurface,
    borderStyle: "dashed",
    borderRadius: radii.md,
  },
  exampleDot: {
    width: 16,
    height: 16,
    flexShrink: 0,
    backgroundColor: colors.accentText,
    borderRadius: radii.circle,
  },
  sampleText: {
    overflowWrap: "anywhere",
    color: colors.textPrimary,
  },
  shape: {
    height: 48,
    width: 48,
    backgroundColor: colors.accentSurfaceAlpha20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.accentText,
  },
  shadowStage: {
    maxWidth: 200,
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: radii.md,
  },
  shadowSample: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    textAlign: "center",
  },
  track: {
    maxWidth: 240,
    padding: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  runner: {
    width: "25%",
    height: 20,
    borderRadius: radii.pill,
    backgroundColor: colors.accentText,
    transform: "translateX(0)",
    transitionProperty: "transform",
    transitionTimingFunction: motion.easeOut,
  },
  moved: {
    transform: "translateX(300%)",
  },
});
