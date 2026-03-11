import { SidebarContent } from "@/components/layout/SidebarContent";

export function Sidebar({
  activeSection,
  onSelect,
}: {
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-brand-500 bg-brand-900 px-6 py-8 md:flex">
      <SidebarContent
        variant="desktop"
        activeSection={activeSection}
        onSelect={onSelect}
      />
    </aside>
  );
}
