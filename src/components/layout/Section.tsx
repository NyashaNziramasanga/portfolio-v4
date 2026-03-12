import * as React from "react";

export const Section = React.forwardRef<
  HTMLElement,
  { id: string; children: React.ReactNode }
>(({ id, children }, ref) => (
  <section
    id={id}
    ref={ref}
    className="flex min-h-screen items-start justify-center px-4 py-10 sm:items-center sm:px-10 sm:py-16 md:snap-start"
  >
    {children}
  </section>
));

Section.displayName = "Section";
