import toolsData from "@/tools/data/tools.json";
import type { RegisteredTool, ToolListItem, ToolSlug } from "@/tools/types";
import { MobileAppStackPicker } from "@/tools/mobile-app-stack-picker";

const tools = toolsData as ToolListItem[];

const mobileAppStackPicker = tools.find(
  (tool) => tool.slug === "mobile-app-stack-picker",
);

if (!mobileAppStackPicker) {
  throw new Error("Missing mobile-app-stack-picker entry in tools.json");
}

const toolRegistry: Record<ToolSlug, RegisteredTool> = {
  "mobile-app-stack-picker": {
    ...mobileAppStackPicker,
    component: MobileAppStackPicker,
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
