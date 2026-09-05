import { Menu, X } from "lucide-react";
import type { Ref } from "react";
import * as stylex from "@stylexjs/stylex";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { colors, constants } from "../../styles/tokens.stylex";

export function MobileHeader({
  isOpen,
  onToggle,
  buttonRef,
}: {
  isOpen: boolean;
  onToggle: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
}) {
  return (
    <header {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.identity)}>
        <ProfileAvatar size="mobile" style={styles.avatar} />
        <div>
          <p {...stylex.props(styles.name)}>Nash Nziramasanga</p>
          <p {...stylex.props(styles.role)}>Senior Mobile Engineer</p>
        </div>
      </div>
      <button
        ref={buttonRef}
        onClick={onToggle}
        {...stylex.props(styles.button)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X {...stylex.props(styles.icon)} />
        ) : (
          <Menu {...stylex.props(styles.icon)} />
        )}
      </button>
    </header>
  );
}

const styles = stylex.create({
  root: {
    display: {
      default: "flex",
      [constants.lg]: "none",
    },
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.brand500,
    backgroundColor: colors.brand900,
    paddingInline: 20,
    paddingBlock: 14,
  },
  identity: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    boxShadow: `0 0 0 2px ${colors.brand400}`,
  },
  name: {
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 700,
    color: colors.brand50,
  },
  role: {
    fontSize: 12,
    lineHeight: "16px",
    color: colors.brand300,
  },
  button: {
    display: "inline-flex",
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 8,
    color: {
      default: colors.brand200,
      ":hover": colors.brand50,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklab, #2D3748 60%, transparent)",
    },
    transitionProperty: "color, background-color",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
