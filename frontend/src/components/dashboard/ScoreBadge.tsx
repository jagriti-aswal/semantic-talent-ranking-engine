import { cn } from "../../lib/utils";

export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  const tone =
    score >= 90
      ? "bg-success/15 text-success ring-success/25"
      : score >= 80
        ? "bg-primary/15 text-primary ring-primary/30"
        : score >= 70
          ? "bg-warning/15 text-warning ring-warning/30"
          : "bg-muted text-muted-foreground ring-border-strong";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums ring-1 ring-inset",
        tone,
        className,
      )}
    >
      {score}
      <span className="text-[0.65rem] font-medium opacity-60">/100</span>
    </span>
  );
}
