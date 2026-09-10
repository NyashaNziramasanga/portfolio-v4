import { lazy } from "react";
import toolsData from "@/tools/data/tools.json";
import type { RegisteredTool, ToolListItem, ToolSlug } from "@/tools/types";

const tools = toolsData as ToolListItem[];

function findTool(slug: ToolSlug): ToolListItem {
  const tool = tools.find((entry) => entry.slug === slug);
  if (!tool) {
    throw new Error(`Missing ${slug} entry in tools.json`);
  }
  return tool;
}

const toolRegistry: Record<ToolSlug, RegisteredTool> = {
  "design-system": {
    ...findTool("design-system"),
    component: lazy(() =>
      import("@/tools/design-system").then(({ DesignSystem }) => ({
        default: DesignSystem,
      })),
    ),
  },
  "mobile-app-stack-picker": {
    ...findTool("mobile-app-stack-picker"),
    component: lazy(() =>
      import("@/tools/mobile-app-stack-picker").then(
        ({ MobileAppStackPicker }) => ({
          default: MobileAppStackPicker,
        }),
      ),
    ),
  },
  "border-radius-calculator": {
    ...findTool("border-radius-calculator"),
    component: lazy(() =>
      import("@/tools/border-radius-calculator").then(
        ({ BorderRadiusCalculator }) => ({
          default: BorderRadiusCalculator,
        }),
      ),
    ),
  },
};

export const allTools = Object.values(toolRegistry);

export function isToolSlug(slug: string): slug is ToolSlug {
  return slug in toolRegistry;
}

export function getToolBySlug(slug: string): RegisteredTool | undefined {
  if (!isToolSlug(slug)) return undefined;
  return toolRegistry[slug];
}
