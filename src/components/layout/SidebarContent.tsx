import * as stylex from "@stylexjs/stylex";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { SidebarNav } from "@/components/SidebarNav";
import { SocialLinks } from "@/components/SocialLinks";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { fonts } from "../../styles/Fonts.stylex";
import { fontWeights, lineHeights } from "../../styles/Typography.stylex";

export function SidebarContent({
  variant,
  activeSection,
  onSelect,
}: {
  variant: "mobile" | "desktop";
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  const isMobile = variant === "mobile";

  return (
    <>
      <ProfileAvatar
        size={isMobile ? "mobile" : "desktop"}
        style={!isMobile ? styles.avatarDesktop : undefined}
      />
      <p
        {...stylex.props(
          isMobile ? fonts.title : fonts.titleLarge,
          styles.name,
          isMobile ? styles.nameMobile : styles.nameDesktop,
        )}
      >
        Nyasha (Nash) Nziramasanga
      </p>
      <h2
        {...stylex.props(
          isMobile ? fonts.body : fonts.bodyLarge,
          styles.role,
          isMobile ? styles.roleMobile : styles.roleDesktop,
        )}
      >
        Senior Mobile Engineer
      </h2>
      <hr {...stylex.props(styles.rule)} />
      <SidebarNav activeSection={activeSection} onSelect={onSelect} />
      <div {...stylex.props(styles.social)}>
        <SocialLinks />
      </div>
    </>
  );
}

const styles = stylex.create({
  avatarDesktop: {
    marginBottom: spacing.lg,
  },
  name: {
    marginBottom: spacing.xxs,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    color: colors.textPrimary,
  },
  nameMobile: {
    lineHeight: lineHeights.line28,
  },
  nameDesktop: {
    lineHeight: lineHeights.line28,
  },
  role: {
    marginBottom: spacing.lg,
    fontWeight: fontWeights.medium,
    color: colors.textMuted,
  },
  roleMobile: {
    lineHeight: lineHeights.line20,
  },
  roleDesktop: {
    lineHeight: lineHeights.line24,
  },
  rule: {
    marginBottom: spacing.lg,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  social: {
    marginTop: "auto",
    paddingTop: spacing.lg,
  },
});
