import publicationsData from "@/data/publications.json";

type Publication = (typeof publicationsData)[number];
type Platform = Publication["platform"];

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "youtube") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#FF0000] sm:h-10 sm:w-10">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white sm:h-5 sm:w-5" aria-hidden>
          <path fill="currentColor" d="M8 5v14l11-7z" />
        </svg>
      </div>
    );
  }
  if (platform === "medium") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black sm:h-10 sm:w-10">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white sm:h-5 sm:w-5"
          fill="currentColor"
          aria-hidden
        >
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      </div>
    );
  }
  if (platform === "devto") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black sm:h-10 sm:w-10">
        <span
          className="text-center text-[10px] font-bold uppercase leading-none text-white sm:text-xs"
          aria-hidden
        >
          DEV
        </span>
      </div>
    );
  }
  return null;
}

export function PublicationsList() {
  return (
    <div className="flex min-h-full flex-1 flex-col px-4 py-8 sm:px-8 sm:py-12">
      <h2 className="mb-6 text-xl font-bold text-slate-50 sm:mb-8 sm:text-2xl">Publications</h2>
      <div className="flex flex-col gap-3">
        {publicationsData.map((pub: Publication) => (
          <a
            key={pub.id}
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-slate-200/90 px-3 py-2.5 text-slate-900 shadow-sm transition-[background-color,transform] duration-200 hover:scale-[1.01] hover:bg-slate-100 sm:gap-4 sm:rounded-full sm:px-4 sm:py-3"
          >
            <PlatformIcon platform={pub.platform} />
            <span className="min-w-0 flex-1 text-sm font-medium sm:text-base">{pub.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
