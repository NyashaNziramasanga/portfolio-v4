import { useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SnippetOutputProps = {
  outerRadius: number;
  innerRadius: number;
  padding: number;
};

type Format = "css" | "react-native";

const FORMATS: { id: Format; label: string }[] = [
  { id: "css", label: "CSS" },
  { id: "react-native", label: "React Native" },
];

function buildCss({ outerRadius, innerRadius, padding }: SnippetOutputProps) {
  return `.outer-box {
  padding: ${padding}px;
  border-radius: ${outerRadius}px;
}

.inner-box {
  border-radius: ${innerRadius}px;
}`;
}

function buildReactNative({
  outerRadius,
  innerRadius,
  padding,
}: SnippetOutputProps) {
  return `import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  outerBox: {
    padding: ${padding},
    borderRadius: ${outerRadius},
  },
  innerBox: {
    borderRadius: ${innerRadius},
  },
});`;
}

export function SnippetOutput(props: SnippetOutputProps) {
  const [format, setFormat] = useState<Format>("css");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const snippets = useMemo(
    () => ({
      css: buildCss(props),
      "react-native": buildReactNative(props),
    }),
    [props],
  );

  const activeSnippet = snippets[format];

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timeoutId = window.setTimeout(() => setCopyStatus("idle"), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [copyStatus]);

  useEffect(() => {
    setCopyStatus("idle");
  }, [format]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <section
      aria-labelledby="snippet-output-heading"
      className="rounded-2xl border border-brand-700 bg-brand-800/60 p-5 sm:p-6"
    >
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h3
            id="snippet-output-heading"
            className="text-lg font-semibold text-brand-50"
          >
            Snippet
          </h3>
          <div
            role="tablist"
            aria-label="Snippet format"
            className="inline-flex rounded-md border border-brand-500 bg-brand-900/60 p-0.5"
          >
            {FORMATS.map((option) => {
              const isActive = format === option.id;
              return (
                <button
                  key={option.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setFormat(option.id)}
                  className={cn(
                    "rounded px-2.5 py-1 text-xs font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "bg-brand-700 text-brand-50"
                      : "text-brand-300 hover:text-brand-100",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="border border-brand-500 bg-brand-800 text-brand-100 hover:bg-brand-700"
          onClick={handleCopy}
          aria-live="polite"
        >
          {copyStatus === "copied" ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : copyStatus === "error" ? (
            "Copy failed"
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </header>

      <pre className="overflow-x-auto rounded-lg bg-brand-900/80 p-4 text-xs leading-relaxed text-brand-100 sm:text-sm">
        <code>{activeSnippet}</code>
      </pre>
    </section>
  );
}
