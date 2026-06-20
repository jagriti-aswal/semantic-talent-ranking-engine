import { ScanSearch } from "lucide-react";

export function EmptyState() {
  return (
    <section className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-strong/60 bg-card/40 px-6 py-16 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/20 blur-2xl" />
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface shadow-elevated">
          <ScanSearch className="h-9 w-9 text-primary" strokeWidth={1.6} />
        </div>
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">
        No candidates ranked yet
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Upload candidate data and paste a job description to begin ranking.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-secondary px-3 py-1 ring-1 ring-inset ring-border">
          1 · Upload dataset
        </span>
        <span className="rounded-full bg-secondary px-3 py-1 ring-1 ring-inset ring-border">
          2 · Add job description
        </span>
        <span className="rounded-full bg-secondary px-3 py-1 ring-1 ring-inset ring-border">
          3 · Rank candidates
        </span>
      </div>
    </section>
  );
}
