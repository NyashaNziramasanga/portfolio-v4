import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ToolPage } from "@/tools/ToolPage";
import { getToolBySlug, isToolSlug } from "@/tools/toolRegistry";
import { colors, constants } from "../styles/tokens.stylex";

function ToolRouteScreen() {
  const { toolId } = Route.useParams();
  const tool = getToolBySlug(toolId);

  if (!tool) return null;

  const ToolComponent = tool.component;

  return (
    <ToolPage tool={tool}>
      <Suspense
        fallback={
          <div {...stylex.props(styles.loading)} aria-label="Loading tool" />
        }
      >
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

const pulse = stylex.keyframes({
  "50%": {
    opacity: 0.5,
  },
});

const styles = stylex.create({
  loading: {
    minHeight: 256,
    borderRadius: 16,
    backgroundColor: colors.brand700,
    animationName: {
      default: pulse,
      [constants.reduceMotion]: "none",
    },
    animationDuration: "2s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    animationIterationCount: "infinite",
  },
});
