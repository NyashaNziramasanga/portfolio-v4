import { cn } from "@/lib/utils";

export function CollapsiblePanel({
  open,
  children,
  id,
}: {
  open: boolean;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "grid transition-all duration-300 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
