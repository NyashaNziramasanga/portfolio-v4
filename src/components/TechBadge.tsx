import {
  siTypescript, siReact, siNodedotjs, siNextdotjs, siGooglecloud,
  siGit, siBun, siClaude, siPostgresql, siTailwindcss,
  siGraphql, siFigma, siCursor, siIos, siAndroid,
} from "simple-icons";
import { Bot, Cloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SimpleIconSvg } from "@/components/SimpleIconSvg";

const simpleIconsMap: Record<string, { path: string; hex: string }> = {
  siTypescript, siReact, siNodedotjs, siNextdotjs, siGooglecloud,
  siGit, siBun, siClaude, siPostgresql, siTailwindcss,
  siGraphql, siFigma, siCursor, siIos, siAndroid,
};

const lucideIconsMap: Record<string, LucideIcon> = { Bot, Cloud };

export function TechBadge({
  iconKey,
  label,
  colorOverride,
}: {
  iconKey: string;
  label: string;
  colorOverride?: string;
}) {
  const isLucide = iconKey.startsWith("lucide:");
  const key = isLucide ? iconKey.split(":")[1] : iconKey;
  const siIcon = !isLucide ? simpleIconsMap[key] : undefined;
  const LucideIcon = isLucide ? lucideIconsMap[key] : undefined;
  const color = colorOverride ?? (siIcon ? `#${siIcon.hex}` : undefined);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500 bg-brand-800/60 px-3 py-1.5 text-xs text-brand-100 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm">
      {siIcon ? (
        <SimpleIconSvg
          icon={siIcon}
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          aria-label={label}
          style={{ color }}
        />
      ) : LucideIcon ? (
        <LucideIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color }} />
      ) : null}
      {label}
    </span>
  );
}
