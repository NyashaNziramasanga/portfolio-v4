import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { SidebarContent } from "@/components/layout/SidebarContent";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { shadows } from "../../styles/Shadows.stylex";
import { layout } from "../../styles/Layout.stylex";

export function MobileDrawer({
  isOpen,
  onClose,
  activeSection,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    dialog.showModal();
    closeButtonRef.current?.focus();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Navigation menu"
      {...stylex.props(styles.dialog)}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div {...stylex.props(styles.content)}>
        <div {...stylex.props(styles.header)}>
          <div />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            {...stylex.props(styles.closeButton)}
            aria-label="Close menu"
          >
            <X {...stylex.props(styles.icon)} />
          </button>
        </div>
        <SidebarContent
          variant="mobile"
          activeSection={activeSection}
          onSelect={onSelect}
        />
      </div>
    </dialog>
  );
}

const styles = stylex.create({
  dialog: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    margin: 0,
    height: "100dvh",
    width: layout.sidebarWidth,
    maxHeight: "none",
    maxWidth: "none",
    borderWidth: 0,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    backgroundColor: colors.background,
    padding: 0,
    color: colors.textPrimary,
    display: {
      [breakpoints.lg]: "none",
    },
    "::backdrop": {
      backgroundColor: colors.overlay,
    },
  },
  content: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    paddingInline: spacing.xl,
    paddingBlock: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    display: "inline-flex",
    minHeight: layout.touchTarget,
    minWidth: layout.touchTarget,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    padding: spacing.xs,
    color: {
      default: colors.textSecondary,
      ":hover": colors.textPrimary,
    },
    backgroundColor: {
      default: colors.transparent,
      ":hover": colors.surfaceHoverAlpha60,
    },
    transitionProperty: "color, background-color",
    outline: {
      ":focus-visible": "none",
    },
    boxShadow: {
      ":focus-visible": shadows.focus,
    },
  },
  icon: {
    width: 20,
    height: 20,
  },
});
