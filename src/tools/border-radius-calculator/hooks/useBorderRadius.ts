import { useCallback, useState } from "react";

export type RadiusField = "padding" | "outer" | "inner" | "min";

export type RadiusState = {
  padding: number;
  outer: number;
  inner: number;
  min: number;
};

export const RADIUS_BOUNDS = {
  padding: { min: 0, max: 200 },
  outer: { min: 0, max: 200 },
  inner: { min: 0, max: 200 },
  min: { min: 0, max: 64 },
} as const;

const DEFAULTS: RadiusState = {
  padding: 36,
  outer: 63,
  inner: 27,
  min: 16,
};

const clamp = (value: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, value));

/**
 * Keeps the three radii consistent with the rule: inner + padding = outer.
 * Editing one field re-derives the others while honouring `min` (a floor for
 * the inner radius) and the global slider bounds.
 *
 * Each branch prefers the user-edited field, lets `inner` floor at `min`, and
 * uses `padding` as the slack variable to absorb anything left over so the
 * invariant always holds even when `outer` would otherwise clamp at its max.
 */
export function useBorderRadius(initial: Partial<RadiusState> = {}) {
  const [state, setState] = useState<RadiusState>({ ...DEFAULTS, ...initial });

  const set = useCallback((field: RadiusField, raw: number) => {
    setState((prev) => {
      const bounds = RADIUS_BOUNDS[field];
      const value = clamp(Math.round(raw), bounds.min, bounds.max);

      switch (field) {
        case "padding": {
          const desiredInner = prev.outer - value;
          if (desiredInner >= prev.min) {
            return { ...prev, padding: value, inner: desiredInner };
          }
          const inner = prev.min;
          const desiredOuter = inner + value;
          if (desiredOuter <= RADIUS_BOUNDS.outer.max) {
            return { ...prev, padding: value, inner, outer: desiredOuter };
          }
          const outer = RADIUS_BOUNDS.outer.max;
          const padding = clamp(
            outer - inner,
            RADIUS_BOUNDS.padding.min,
            RADIUS_BOUNDS.padding.max,
          );
          return { ...prev, padding, inner, outer };
        }

        case "outer": {
          const desiredInner = value - prev.padding;
          if (desiredInner >= prev.min) {
            return { ...prev, outer: value, inner: desiredInner };
          }
          const inner = prev.min;
          const outer = Math.max(value, inner);
          const padding = clamp(
            outer - inner,
            RADIUS_BOUNDS.padding.min,
            RADIUS_BOUNDS.padding.max,
          );
          return { ...prev, outer, inner, padding };
        }

        case "inner": {
          const inner = Math.max(prev.min, value);
          const desiredOuter = inner + prev.padding;
          if (desiredOuter <= RADIUS_BOUNDS.outer.max) {
            return { ...prev, inner, outer: desiredOuter };
          }
          const outer = RADIUS_BOUNDS.outer.max;
          const padding = clamp(
            outer - inner,
            RADIUS_BOUNDS.padding.min,
            RADIUS_BOUNDS.padding.max,
          );
          return { ...prev, inner, outer, padding };
        }

        case "min": {
          const inner = Math.max(value, prev.inner);
          if (inner === prev.inner) {
            return { ...prev, min: value };
          }
          const desiredOuter = inner + prev.padding;
          if (desiredOuter <= RADIUS_BOUNDS.outer.max) {
            return { ...prev, min: value, inner, outer: desiredOuter };
          }
          const outer = RADIUS_BOUNDS.outer.max;
          const padding = clamp(
            outer - inner,
            RADIUS_BOUNDS.padding.min,
            RADIUS_BOUNDS.padding.max,
          );
          return { ...prev, min: value, inner, outer, padding };
        }

        default:
          return prev;
      }
    });
  }, []);

  const reset = useCallback(() => setState(DEFAULTS), []);

  return { state, set, reset };
}
