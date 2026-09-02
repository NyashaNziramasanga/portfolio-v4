import { ExternalLink } from "lucide-react";
import { track } from "@vercel/analytics/react";

const RESUME_URL = "/files/nyasha-nziramasanga-resume.pdf";

export function ResumeActions() {
  const baseClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-500 px-4 py-2.5 text-sm font-semibold text-brand-100 transition-colors hover:border-blue-400/60 hover:bg-brand-700 hover:text-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClass}
      onClick={() => track("Resume Viewed")}
    >
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      View résumé
    </a>
  );
}
