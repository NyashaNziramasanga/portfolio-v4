import type { ComponentType } from "react";
import categoriesData from "@/tools/mobile-app-stack-picker/data/categories.json";

export const TOOL_SLUGS = [
  "mobile-app-stack-picker",
  "border-radius-calculator",
] as const;

export type ToolSlug = (typeof TOOL_SLUGS)[number];

export type ToolStatus = "live" | "coming-soon";

export type ToolListItem = {
  id: string;
  slug: ToolSlug;
  title: string;
  description: string;
  status: ToolStatus;
};

export type ToolRouteComponent = ComponentType;

export type RegisteredTool = ToolListItem & {
  component: ToolRouteComponent;
};

export type StackCategory = (typeof categoriesData)[number];
export type StackItem = StackCategory["items"][number];

export type StackSelection = Record<string, string | null>;

export type SelectedStackEntry = {
  categoryId: string;
  categoryLabel: string;
  itemId: string;
  itemLabel: string;
  iconKey?: string;
};
