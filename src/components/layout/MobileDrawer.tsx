import { useEffect, useRef } from "react";
import { X } from "lucide-react";
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    dialog.showModal();
    closeButtonRef.current?.focus();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Navigation menu"
      className="fixed inset-y-0 left-0 m-0 h-dvh w-72 max-h-none max-w-none border-0 border-r border-brand-500 bg-brand-900 p-0 text-brand-50 backdrop:bg-black/60 md:hidden"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="flex h-full flex-col px-6 py-6">
        <div className="mb-5 flex items-center justify-between">
          <div />
          <button ref={closeButtonRef} type="button" onClick={onClose} className="rounded-lg p-2 text-brand-200 transition-colors hover:bg-brand-600/60 hover:text-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <SidebarContent variant="mobile" activeSection={activeSection} onSelect={onSelect} />
      </div>
    </dialog>
  );
}
