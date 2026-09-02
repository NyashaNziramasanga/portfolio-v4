import { ChevronDown, ExternalLink, Newspaper, PlayCircle } from "lucide-react";
import { track } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import type { CaseStudy } from "./types";

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">{title}</h4>
      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-brand-200">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudyCard({ study, open, onToggle }: { study: CaseStudy; open: boolean; onToggle: () => void }) {
  const panelId = `case-study-panel-${study.id}`;
  const responsiveImageBase = study.media.src.replace(/\.webp$/, "");

  return (
    <article id={`case-study-${study.id}`} className={cn("scroll-mt-6 rounded-2xl border bg-brand-700 shadow-sm transition-colors", open ? "border-blue-400/40 bg-brand-600" : "border-brand-500/50")}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 rounded-2xl p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-5"
        onClick={onToggle}
      >
        <span className="grid min-w-0 flex-1 gap-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center lg:grid-cols-[12rem_minmax(0,1fr)]">
          <img
            src={study.media.src}
            srcSet={`${responsiveImageBase}-320.webp 320w, ${responsiveImageBase}-640.webp 640w, ${study.media.src} 1536w`}
            sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, calc(100vw - 4rem)"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={1536}
            height={864}
            className="aspect-[16/9] w-full rounded-xl border border-brand-500/40 object-cover"
          />
          <span className="min-w-0">
            <span className="block text-lg font-bold text-brand-50 sm:text-xl">{study.title}</span>
          <span className="mt-2 block max-w-3xl text-sm leading-relaxed text-brand-300 sm:text-base">{study.summary}</span>
          </span>
        </span>
        <ChevronDown className={cn("mt-1 h-5 w-5 shrink-0 text-brand-300 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      <CollapsiblePanel open={open} id={panelId} lazyMount>
        <div className="border-t border-brand-500/50 px-5 pb-6 pt-5 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">Problem</h4>
              <p className="mt-2 text-sm leading-relaxed text-brand-200">{study.problem}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">My role</h4>
              <p className="mt-2 text-sm leading-relaxed text-brand-200">{study.role}</p>
            </div>
            <DetailList title="Technical complexity" items={study.technicalComplexity} />
            <DetailList title="Engineering decisions" items={study.decisions} />
            <DetailList title="Outcomes" items={study.outcomes} />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">Public evidence</h4>
              {study.evidence.length > 0 ? (
                <div className="mt-2 flex flex-col gap-2">
                  {study.evidence.map((item) => {
                    const Icon = item.type === "video" ? PlayCircle : Newspaper;
                    return (
                      <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-blue-200" onClick={() => track("Case Study Evidence Clicked", { study: study.id, type: item.type })}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {item.label}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-brand-300">Sanitized workflow shown above. Internal implementation details and metrics are intentionally omitted.</p>
              )}
            </div>
          </div>
        </div>
      </CollapsiblePanel>
    </article>
  );
}
