import { Menu, X } from "lucide-react";
import { ProfileAvatar } from "@/components/ProfileAvatar";

export function MobileHeader({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="flex items-center justify-between border-b border-brand-500 bg-brand-900 px-5 py-3.5 md:hidden">
      <div className="flex items-center gap-3">
        <ProfileAvatar size="h-9 w-9" ringSize="ring-2" />
        <div>
          <p className="text-sm font-bold text-brand-50">Nash Nziramasanga</p>
          <p className="text-xs text-brand-300">Senior Software Engineer</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className="rounded-lg p-2 text-brand-200 transition-colors hover:bg-brand-600/60 hover:text-brand-50"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </header>
  );
}
