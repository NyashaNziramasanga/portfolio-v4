import { siGithub, siYoutube, siGmail, siLinktree } from "simple-icons";
import { Linkedin } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";
import { track } from "@vercel/analytics/react";
import { colors } from "../styles/Colors.stylex";
import { spacing } from "../styles/Spacing.stylex";
import { layout } from "../styles/Layout.stylex";

const socialLinks = [
  {
    href: "https://github.com/NyashaNziramasanga",
    icon: siGithub,
    label: "GitHub",
  },
  {
    href: "https://www.youtube.com/@Nyasha_Nziboi",
    icon: siYoutube,
    label: "YouTube",
  },
  {
    href: "mailto:nyashanziramasanga1@gmail.com",
    icon: siGmail,
    label: "Email",
  },
  {
    href: "https://linktr.ee/nyasha_nziboi",
    icon: siLinktree,
    label: "Linktree",
  },
  {
    href: "https://www.linkedin.com/in/nyasha-nash-nziramasanga/",
    lucide: Linkedin,
    label: "LinkedIn",
  },
] as const;

export function SocialLinks() {
  return (
    <div {...stylex.props(styles.root)}>
      {socialLinks.map(({ href, label, ...rest }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          {...stylex.props(styles.link)}
          aria-label={label}
          onClick={() =>
            track(
              label === "Email" ? "Contact Clicked" : "Social Link Clicked",
              { location: "sidebar", destination: label },
            )
          }
        >
          {"icon" in rest ? (
            <SimpleIconSvg icon={rest.icon} style={styles.icon} />
          ) : (
            <rest.lucide {...stylex.props(styles.icon)} />
          )}
        </a>
      ))}
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    justifyContent: "center",
    gap: spacing.xs,
  },
  link: {
    display: "inline-flex",
    minHeight: layout.touchTarget,
    minWidth: layout.touchTarget,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xs,
    color: {
      default: colors.textMuted,
      ":hover": colors.textPrimary,
    },
    transitionProperty: "color",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
