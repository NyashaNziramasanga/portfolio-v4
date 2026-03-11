import { cn } from "@/lib/utils";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { SidebarNav } from "@/components/SidebarNav";
import { SocialLinks } from "@/components/SocialLinks";

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
        size={isMobile ? "h-20 w-20" : "h-28 w-28"}
        ringSize="ring-4"
        className={isMobile ? undefined : "mb-5"}
      />
      <h1
        className={cn(
          "font-bold leading-tight text-brand-50",
          isMobile ? "mb-0.5 text-lg" : "mb-0.5 text-xl",
        )}
      >
        Nyasha (Nash) Nziramasanga
      </h1>
      <h2
        className={cn(
          "mb-5 font-medium text-brand-300",
          isMobile ? "text-sm" : "text-base",
        )}
      >
        Senior Software Engineer
      </h2>
      <hr className="mb-5 border-brand-500" />
      <SidebarNav activeSection={activeSection} onSelect={onSelect} />
      <div className="mt-auto pt-5">
        <SocialLinks />
      </div>
    </>
  );
}
