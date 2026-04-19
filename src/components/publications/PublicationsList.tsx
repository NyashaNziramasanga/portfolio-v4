import { useExpandCollapse } from "@/hooks/useExpandCollapse";
import publicationsData from "@/data/publications.json";
import { PublicationCard } from "./PublicationCard";
import type { Publication } from "./types";

export function PublicationsList() {
  const { expandedId, toggle, handleEnter, handleLeave, handleFocus, handleBlur } =
    useExpandCollapse();

  return (
    <div className="flex w-full max-w-5xl flex-col">
      <h2 className="mb-8 text-xl font-bold text-brand-50 sm:mb-10 sm:text-2xl">
        Publications
      </h2>
      <div className="flex flex-col gap-4">
        {(publicationsData as Publication[]).map((pub) => (
          <PublicationCard
            key={pub.id}
            publication={pub}
            isExpanded={expandedId === pub.id}
            onToggle={() => toggle(pub.id)}
            onEnter={() => handleEnter(pub.id)}
            onLeave={handleLeave}
            onFocus={() => handleFocus(pub.id)}
            onBlur={handleBlur}
          />
        ))}
      </div>
    </div>
  );
}
