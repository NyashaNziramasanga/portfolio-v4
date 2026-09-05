import * as stylex from "@stylexjs/stylex";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { SidebarNav } from "@/components/SidebarNav";
import { SocialLinks } from "@/components/SocialLinks";
import { colors } from "../../styles/tokens.stylex";

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
          styles.name,
          isMobile ? styles.nameMobile : styles.nameDesktop,
        )}
      >
        Nyasha (Nash) Nziramasanga
      </p>
      <h2
        {...stylex.props(
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
    marginBottom: 20,
  },
  name: {
    marginBottom: 2,
    fontWeight: 700,
    lineHeight: 1.25,
    color: colors.brand50,
  },
  nameMobile: {
    fontSize: 18,
    lineHeight: "28px",
  },
  nameDesktop: {
    fontSize: 20,
    lineHeight: "28px",
  },
  role: {
    marginBottom: 20,
    fontWeight: 500,
    color: colors.brand300,
  },
  roleMobile: {
    fontSize: 14,
    lineHeight: "20px",
  },
  roleDesktop: {
    fontSize: 16,
    lineHeight: "24px",
  },
  rule: {
    marginBottom: 20,
    borderTopWidth: 1,
    borderColor: colors.brand500,
  },
  social: {
    marginTop: "auto",
    paddingTop: 20,
  },
});
