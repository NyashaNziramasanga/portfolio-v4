import { useState } from "react";
import { Archive, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import publicationsData from "@/data/publications.json";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { PublicationCard } from "./PublicationCard";
import type { Publication } from "./types";

const publications = publicationsData as Publication[];
const featured = publications.filter((publication) => !publication.archived).sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
const archived = publications.filter((publication) => publication.archived);

export function PublicationsList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const togglePublication = (id: string) => setExpandedId((current) => current === id ? null : id);

  return (
    <div className="flex w-full max-w-5xl flex-col">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-xl font-bold text-brand-50 sm:text-2xl">Publications</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-300">Selected talks, mobile architecture writing and research.</p>
      </div>
      <div className="flex flex-col gap-4">
        {featured.map((publication) => <PublicationCard key={publication.id} publication={publication} isExpanded={expandedId === publication.id} onToggle={() => togglePublication(publication.id)} />)}
      </div>

      <div className="mt-6">
        <button type="button" aria-expanded={archiveOpen} aria-controls="older-writing-panel" onClick={() => setArchiveOpen((open) => !open)} className="inline-flex items-center gap-2 rounded-lg border border-brand-500 px-3 py-2 text-sm font-semibold text-brand-300 outline-none transition-colors hover:bg-brand-700 hover:text-brand-100 focus-visible:ring-2 focus-visible:ring-primary">
          <Archive className="h-4 w-4" aria-hidden="true" />
          Older writing ({archived.length})
          <ChevronDown className={cn("h-4 w-4 transition-transform", archiveOpen && "rotate-180")} aria-hidden="true" />
        </button>
        <CollapsiblePanel open={archiveOpen} id="older-writing-panel">
          <div className="mt-4 flex flex-col gap-3 border-l border-brand-500/60 pl-3 sm:pl-5">
            {archived.map((publication) => <PublicationCard key={publication.id} publication={publication} isExpanded={expandedId === publication.id} onToggle={() => togglePublication(publication.id)} />)}
          </div>
        </CollapsiblePanel>
      </div>
    </div>
  );
}
