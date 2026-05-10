import toolsData from "@/tools/data/tools.json";
import type { RegisteredTool, ToolListItem, ToolSlug } from "@/tools/types";
import { MobileAppStackPicker } from "@/tools/mobile-app-stack-picker";
import { BorderRadiusCalculator } from "@/tools/border-radius-calculator";

const tools = toolsData as ToolListItem[];

function findTool(slug: ToolSlug): ToolListItem {
  const tool = tools.find((entry) => entry.slug === slug);
  if (!tool) {
    throw new Error(`Missing ${slug} entry in tools.json`);
  }
  return tool;
}

const toolRegistry: Record<ToolSlug, RegisteredTool> = {
  "mobile-app-stack-picker": {
    ...findTool("mobile-app-stack-picker"),
    component: MobileAppStackPicker,
  },
  "border-radius-calculator": {
    ...findTool("border-radius-calculator"),
    component: BorderRadiusCalculator,
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
