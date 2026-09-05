import * as stylex from "@stylexjs/stylex";
import { motion } from "../../styles/Motion.stylex";

export function CollapsiblePanel({
  open,
  children,
  id,
  lazyMount = false,
}: {
  open: boolean;
  children: React.ReactNode;
  id?: string;
  lazyMount?: boolean;
}) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      inert={!open}
      {...stylex.props(styles.root, open ? styles.open : styles.closed)}
    >
      <div {...stylex.props(styles.inner)}>
        {!lazyMount || open ? children : null}
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "grid",
    transitionProperty: {
      default: "all",
      [motion.reduce]: "none",
    },
    transitionDuration: {
      default: motion.slow,
      [motion.reduce]: motion.instant,
    },
    transitionTimingFunction: motion.easeOut,
  },
  open: {
    gridTemplateRows: "1fr",
    opacity: 1,
  },
  closed: {
    gridTemplateRows: "0fr",
    opacity: 0,
  },
  inner: {
    overflow: "hidden",
  },
});
