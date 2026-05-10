import { BorderRadiusHeader } from "@/tools/border-radius-calculator/components/BorderRadiusHeader";
import { RadiusIllustration } from "@/tools/border-radius-calculator/components/RadiusIllustration";
import { ConfigurePanel } from "@/tools/border-radius-calculator/components/ConfigurePanel";
import { FormulaBadge } from "@/tools/border-radius-calculator/components/FormulaBadge";
import { SnippetOutput } from "@/tools/border-radius-calculator/components/SnippetOutput";
import { useBorderRadius } from "@/tools/border-radius-calculator/hooks/useBorderRadius";

export function BorderRadiusCalculator() {
  const { state, set, reset } = useBorderRadius();

  return (
    <div className="pb-10">
      <BorderRadiusHeader />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
        <div className="space-y-5">
          <RadiusIllustration
            outerRadius={state.outer}
            innerRadius={state.inner}
            padding={state.padding}
          />
          <FormulaBadge
            innerRadius={state.inner}
            padding={state.padding}
            outerRadius={state.outer}
            onChange={set}
          />
          <SnippetOutput
            outerRadius={state.outer}
            innerRadius={state.inner}
            padding={state.padding}
          />
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <ConfigurePanel state={state} onChange={set} onReset={reset} />
        </aside>
      </div>
    </div>
  );
}
