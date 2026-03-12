import type { ReactNode, Ref } from "react";

export function Section({
  id,
  children,
  ref,
}: {
  id: string;
  children: ReactNode;
  ref?: Ref<HTMLElement>;
}) {
  return (
    <section
      id={id}
      ref={ref}
      className="flex min-h-screen items-start justify-center px-4 py-10 sm:items-center sm:px-10 sm:py-16 md:snap-start"
    >
      {children}
    </section>
  );
}
