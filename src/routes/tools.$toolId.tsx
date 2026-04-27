import { createFileRoute, redirect } from "@tanstack/react-router";
import { ToolPage, getToolBySlug, isToolSlug } from "@/tools";

function ToolRouteScreen() {
  const { toolId } = Route.useParams();
  const tool = getToolBySlug(toolId);

  if (!tool) return null;

  const ToolComponent = tool.component;

  return (
    <ToolPage tool={tool}>
      <ToolComponent />
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
