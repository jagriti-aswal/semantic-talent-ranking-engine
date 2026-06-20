import { Sparkles, Users } from "lucide-react";

export function DashboardHeader({ totalCandidates }: { totalCandidates: number }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3.5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <h1 className="font-display text-base font-semibold text-foreground">
              AI Candidate Discovery Platform
            </h1>
            <p className="text-xs text-muted-foreground">Talent ranking workspace</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-success/12 px-3 py-1.5 text-xs font-medium text-success ring-1 ring-inset ring-success/25">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Ranking Engine Active
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            {totalCandidates.toLocaleString()} candidates loaded
          </span>
        </div>
      </div>
    </header>
  );
}
