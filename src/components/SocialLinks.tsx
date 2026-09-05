import { siGithub, siYoutube, siGmail, siLinktree } from "simple-icons";
import { Linkedin } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";
import { track } from "@vercel/analytics/react";
import { colors } from "../styles/tokens.stylex";

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
    gap: 8,
  },
  link: {
    display: "inline-flex",
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    color: {
      default: colors.brand300,
      ":hover": colors.brand50,
    },
    transitionProperty: "color",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
