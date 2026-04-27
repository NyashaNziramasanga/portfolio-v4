import * as simpleIcons from "simple-icons";

type SimpleIcon = {
  path: string;
  hex: string;
};

function isSimpleIcon(value: unknown): value is SimpleIcon {
  if (!value || typeof value !== "object") return false;
  return "path" in value && "hex" in value;
}

export function getSimpleIcon(iconKey?: string): SimpleIcon | undefined {
  if (!iconKey) return undefined;

  const icon = (simpleIcons as Record<string, unknown>)[iconKey];
  return isSimpleIcon(icon) ? icon : undefined;
}
