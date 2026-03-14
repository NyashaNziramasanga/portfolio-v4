import { siGithub, siYoutube, siGmail, siLinktree } from "simple-icons";
import { Linkedin } from "lucide-react";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";

const socialLinks = [
  { href: "https://github.com/NyashaNziramasanga", icon: siGithub, label: "GitHub" },
  { href: "https://www.youtube.com/@Nyasha_Nziboi", icon: siYoutube, label: "YouTube" },
  { href: "mailto:nyashanziramasanga1@gmail.com", icon: siGmail, label: "Email" },
  { href: "https://linktr.ee/nyasha_nziboi", icon: siLinktree, label: "Linktree" },
  { href: "https://www.linkedin.com/in/nyasha-nash-nziramasanga-446380116/", lucide: Linkedin, label: "LinkedIn" },
] as const;

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-2">
      {socialLinks.map(({ href, label, ...rest }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="p-2 text-brand-300 transition-colors hover:text-brand-50"
          aria-label={label}
        >
          {"icon" in rest ? (
            <SimpleIconSvg icon={rest.icon} className="h-5 w-5" />
          ) : (
            <rest.lucide className="h-5 w-5" />
          )}
        </a>
      ))}
    </div>
  );
}
