import type { ReactNode, Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";

export function Section({
  id,
  children,
  ref,
}: {
  id: string;
  children: ReactNode;
  ref?: Ref<HTMLElement>;
}) {
  return (
    <section id={id} ref={ref} {...stylex.props(styles.root)}>
      {children}
    </section>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    minHeight: "100vh",
    alignItems: {
      default: "flex-start",
      [breakpoints.sm]: "center",
    },
    justifyContent: "center",
    paddingInline: {
      default: spacing.space16,
      [breakpoints.sm]: spacing.space40,
    },
    paddingBlock: {
      default: spacing.space40,
      [breakpoints.sm]: spacing.space64,
    },
  },
});
