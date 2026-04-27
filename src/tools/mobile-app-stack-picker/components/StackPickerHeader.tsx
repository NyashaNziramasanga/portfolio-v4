export function StackPickerHeader() {
  return (
    <header className="mb-6 sm:mb-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-50 sm:text-5xl">
        Pick a <span className="text-primary">stack</span>. Ship it.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-brand-300 sm:text-base">
        Click through each layer to build your mobile app stack. Export a clean prompt
        you can paste into your workflow.
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
        <span className="rounded-md bg-primary/15 px-2.5 py-1 text-primary">
          single click to select
        </span>
        <span className="rounded-md bg-brand-700 px-2.5 py-1 text-brand-200">
          click again to deselect
        </span>
        <span className="rounded-md bg-brand-700 px-2.5 py-1 text-brand-200">
          picks appear in the bottom bar
        </span>
      </div>
    </header>
  );
}
