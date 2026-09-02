import { Suspense } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ToolPage } from "@/tools/ToolPage";
import { getToolBySlug, isToolSlug } from "@/tools/toolRegistry";

function ToolRouteScreen() {
  const { toolId } = Route.useParams();
  const tool = getToolBySlug(toolId);

  if (!tool) return null;

  const ToolComponent = tool.component;

  return (
    <ToolPage tool={tool}>
      <Suspense fallback={<div className="min-h-64 animate-pulse rounded-2xl bg-brand-700 motion-reduce:animate-none" aria-label="Loading tool" />}>
        <ToolComponent />
      </Suspense>
    </ToolPage>
  );
}

export const Route = createFileRoute("/tools/$toolId")({
  beforeLoad: ({ params }) => {
    if (!isToolSlug(params.toolId)) {
      throw redirect({ to: "/", hash: "tools" });
    }
  },
  component: ToolRouteScreen,
});
