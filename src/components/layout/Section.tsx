import type { ReactNode, Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import { constants } from "../../styles/tokens.stylex";

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
      [constants.sm]: "center",
    },
    justifyContent: "center",
    paddingInline: {
      default: 16,
      [constants.sm]: 40,
    },
    paddingBlock: {
      default: 40,
      [constants.sm]: 64,
    },
  },
});
