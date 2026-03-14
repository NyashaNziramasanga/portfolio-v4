import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarContent } from "@/components/layout/SidebarContent";

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
  return (
    <>
      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-brand-500 bg-brand-900 px-6 py-6 transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <div />
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-brand-200 transition-colors hover:bg-brand-600/60 hover:text-brand-50"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <SidebarContent
          variant="mobile"
          activeSection={activeSection}
          onSelect={onSelect}
        />
      </div>
    </>
  );
}
