import * as React from "react";

export const Section = React.forwardRef<
  HTMLElement,
  { id: string; children: React.ReactNode }
>(({ id, children }, ref) => (
  <section
    id={id}
    ref={ref}
    className="flex min-h-screen snap-start items-center justify-center px-6 py-12 sm:px-10 sm:py-16"
  >
    {children}
  </section>
));

Section.displayName = "Section";
