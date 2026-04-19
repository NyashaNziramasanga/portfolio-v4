import type { Platform } from "./types";

export function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "youtube") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#FF0000] sm:h-10 sm:w-10">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white sm:h-5 sm:w-5"
          aria-hidden
        >
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
  if (platform === "flinders") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#003B71] sm:h-10 sm:w-10">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white sm:h-5 sm:w-5"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
        </svg>
      </div>
    );
  }
  return null;
}
