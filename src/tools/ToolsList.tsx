import { allTools } from "@/tools/toolRegistry";
import { ToolCard } from "@/tools/ToolCard";

export function ToolsList() {
  return (
    <div className="flex w-full max-w-5xl flex-col">
      <h2 className="mb-8 text-xl font-bold text-brand-50 sm:mb-10 sm:text-2xl">Tools</h2>
      <div className="flex flex-col gap-4">
        {allTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
