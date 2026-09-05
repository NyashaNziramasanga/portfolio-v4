import * as stylex from "@stylexjs/stylex";
import { SidebarContent } from "@/components/layout/SidebarContent";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { breakpoints } from "../../styles/Breakpoints.stylex";
import { layout } from "../../styles/Layout.stylex";

export function Sidebar({
  activeSection,
  onSelect,
}: {
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside {...stylex.props(styles.root)}>
      <SidebarContent
        variant="desktop"
        activeSection={activeSection}
        onSelect={onSelect}
      />
    </aside>
  );
}

const styles = stylex.create({
  root: {
    display: {
      default: "none",
      [breakpoints.lg]: "flex",
    },
    width: layout.sidebarWidth,
    flexShrink: 0,
    flexDirection: "column",
    borderRightWidth: 1,
    borderRightColor: colors.border,
    backgroundColor: colors.background,
    paddingInline: spacing.space24,
    paddingBlock: spacing.space32,
  },
});
