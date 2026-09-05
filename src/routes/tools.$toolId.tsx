import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ToolPage } from "@/tools/ToolPage";
import { getToolBySlug, isToolSlug } from "@/tools/toolRegistry";
import { colors } from "../styles/Colors.stylex";
import { radii } from "../styles/BorderRadius.stylex";
import { motion } from "../styles/Motion.stylex";

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
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
    animationName: {
      default: pulse,
      [motion.reduce]: "none",
    },
    animationDuration: motion.pulseDuration,
    animationTimingFunction: motion.pulseEasing,
    animationIterationCount: "infinite",
  },
});
