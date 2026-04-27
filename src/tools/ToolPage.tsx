import type { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { RegisteredTool } from "@/tools/types";

type ToolPageProps = PropsWithChildren<{
  tool: RegisteredTool;
}>;

export function ToolPage({ tool, children }: ToolPageProps) {
  return (
    <main className="min-h-screen bg-brand-900 text-brand-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-6 sm:px-8 sm:py-8">
        <Link
          to="/"
          hash="tools"
          className="inline-flex w-fit items-center gap-2 rounded-md px-2 py-1.5 text-sm text-brand-300 transition-colors hover:text-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <header className="mb-6 mt-3 border-b border-brand-500 pb-5 sm:mb-8">
          <h1 className="text-2xl font-bold text-brand-50 sm:text-3xl">{tool.title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-brand-300 sm:text-base">
            {tool.description}
          </p>
        </header>

        {children}
      </div>
    </main>
  );
}
