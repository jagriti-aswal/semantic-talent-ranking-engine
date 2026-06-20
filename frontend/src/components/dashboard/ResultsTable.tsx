import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Candidate } from "../../data/candidates";
import { ScoreBadge } from "./ScoreBadge";
import { SkillChip } from "./SkillChip";

type SortKey = "rank" | "id" | "currentRole" | "experienceYears" | "score";
type SortDir = "asc" | "desc";

const COLUMNS: { key: SortKey | "matched" | "reasoning"; label: string; sortable: boolean; className?: string }[] = [
  { key: "rank", label: "Rank", sortable: true, className: "w-16" },
  { key: "id", label: "Candidate ID", sortable: true, className: "w-36" },
  { key: "currentRole", label: "Current Role", sortable: true },
  { key: "experienceYears", label: "Experience", sortable: true, className: "w-28" },
  { key: "score", label: "Score", sortable: true, className: "w-28" },
  { key: "matched", label: "Matched Skills", sortable: false },
  { key: "reasoning", label: "Reasoning", sortable: false },
];

export function ResultsTable({
  candidates,
  onSelect,
}: {
  candidates: Candidate[];
  onSelect: (candidate: Candidate) => void;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted = useMemo(() => {
    const copy = [...candidates];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [candidates, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "score" ? "desc" : "asc");
    }
  };

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-display text-sm font-semibold text-foreground">
            Top Ranked Candidates
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {candidates.length} matches · sorted by {sortKey}
          </p>
        </div>
      </div>

      <div className="max-h-[560px] overflow-auto scrollbar-thin">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-surface/95 backdrop-blur">
            <tr className="text-left">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "whitespace-nowrap border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    col.className,
                  )}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key as SortKey)}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                    >
                      {col.label}
                      <SortIcon active={sortKey === col.key} dir={sortDir} />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr
                key={c.id}
                onClick={() => onSelect(c)}
                className="group cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
              >
                <td className="px-4 py-3.5">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-xs font-semibold text-secondary-foreground ring-1 ring-inset ring-border">
                    {c.rank}
                  </span>
                </td>
                <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                  {c.id}
                </td>
                <td className="px-4 py-3.5 font-medium text-foreground">{c.currentRole}</td>
                <td className="px-4 py-3.5 tabular-nums text-muted-foreground">
                  {c.experienceYears} yrs
                </td>
                <td className="px-4 py-3.5">
                  <ScoreBadge score={c.score} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex max-w-[220px] flex-wrap gap-1.5">
                    {(c.matchedSkills || []).slice(0, 3).map((s) => (
                      <SkillChip key={s} label={s} variant="matched" />
                    ))}
                    {(c.matchedSkills || []).length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
                        +{(c.matchedSkills || []).length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <p className="max-w-[260px] truncate text-xs text-muted-foreground" title={c.reasoning}>
                    {c.reasoning}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ArrowUpDown className="h-3 w-3 opacity-50" />;
  return dir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
}
