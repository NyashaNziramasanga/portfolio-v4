import * as stylex from "@stylexjs/stylex";
import { SidebarContent } from "@/components/layout/SidebarContent";
import { colors, constants } from "../../styles/tokens.stylex";

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
      [constants.lg]: "flex",
    },
    width: 288,
    flexShrink: 0,
    flexDirection: "column",
    borderRightWidth: 1,
    borderRightColor: colors.brand500,
    backgroundColor: colors.brand900,
    paddingInline: 24,
    paddingBlock: 32,
  },
});
