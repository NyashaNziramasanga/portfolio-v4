import * as stylex from "@stylexjs/stylex";
import { constants } from "../../styles/tokens.stylex";

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
      [constants.reduceMotion]: "none",
    },
    transitionDuration: {
      default: "300ms",
      [constants.reduceMotion]: "0ms",
    },
    transitionTimingFunction: constants.easeOut,
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
