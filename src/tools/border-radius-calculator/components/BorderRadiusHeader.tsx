export function BorderRadiusHeader() {
  return (
    <header className="mb-6 sm:mb-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-50 sm:text-5xl">
        Concentric corners, <span className="text-primary">solved</span>.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-brand-300 sm:text-base">
        The rule of thumb for nested rounded rectangles is{" "}
        <span className="rounded-md bg-brand-700 px-1.5 py-0.5 font-mono text-xs text-brand-100">
          inner radius + padding = outer radius
        </span>
        . Drag any slider and the others stay in sync.
      </p>
    </header>
  );
}
