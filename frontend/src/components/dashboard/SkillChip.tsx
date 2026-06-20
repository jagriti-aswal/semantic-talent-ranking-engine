import { cn } from "../../lib/utils";

type ChipVariant = "matched" | "missing" | "neutral";

const variantStyles: Record<ChipVariant, string> = {
  matched: "bg-primary-muted text-primary ring-primary/25",
  missing: "bg-warning/12 text-warning ring-warning/25",
  neutral: "bg-secondary text-secondary-foreground ring-border",
};

export function SkillChip({
  label,
  variant = "neutral",
  className,
}: {
  label: string;
  variant?: ChipVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        variantStyles[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
