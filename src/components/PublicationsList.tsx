import publicationsData from "@/data/publications.json";

type Publication = (typeof publicationsData)[number];
type Platform = Publication["platform"];

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "youtube") {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#FF0000]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden>
          <path fill="currentColor" d="M8 5v14l11-7z" />
        </svg>
      </div>
    );
  }
  if (platform === "medium") {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black">
        <span
          className="text-center text-xs font-bold uppercase leading-none text-white"
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
    <div className="flex min-h-full flex-1 flex-col px-8 py-12">
      <h2 className="mb-8 text-2xl font-bold text-slate-50">Publications</h2>
      <div className="flex flex-col gap-3">
        {publicationsData.map((pub: Publication) => (
          <a
            key={pub.id}
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-full bg-slate-200/90 px-4 py-3 text-slate-900 shadow-sm transition-[background-color,transform] duration-200 hover:bg-slate-100 hover:scale-[1.01]"
          >
            <PlatformIcon platform={pub.platform} />
            <span className="min-w-0 flex-1 font-medium">{pub.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
