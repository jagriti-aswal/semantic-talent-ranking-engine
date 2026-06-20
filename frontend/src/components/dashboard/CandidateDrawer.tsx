import { useEffect } from "react";
import { Briefcase, Clock, MapPin, X, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Candidate } from "../../data/candidates";
import { ScoreBadge } from "./ScoreBadge";
import { SkillChip } from "./SkillChip";

export function CandidateDrawer({
  candidate,
  onClose,
}: {
  candidate: Candidate | null;
  onClose: () => void;
}) {
  console.log("DRAWER CANDIDATE", candidate);
  console.log("DRAWER HISTORY", candidate?.history);  
  const open = Boolean(candidate);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card shadow-drawer transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        {candidate && (
          <>
            <div className="flex items-start justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-muted font-display text-sm font-semibold text-primary">
                  #{candidate.rank}
                </div>
                <div>
                  <h2 className="font-display text-base font-semibold text-foreground">
                    {candidate.currentRole}
                  </h2>
                  <p className="font-mono text-xs text-muted-foreground">{candidate.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 scrollbar-thin">
              <Block title="Candidate Profile">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <InfoItem icon={<Briefcase className="h-4 w-4" />} label="Current Role" value={candidate.currentRole} />
                  <InfoItem icon={<Clock className="h-4 w-4" />} label="Experience" value={`${candidate.experienceYears} years`} />
                  <InfoItem icon={<MapPin className="h-4 w-4" />} label="Location" value={candidate.location} />
                  <div className="rounded-lg border border-border bg-surface/50 p-3">
                    <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                      Match Score
                    </p>
                    <div className="mt-1.5">
                      <ScoreBadge score={candidate.score} />
                    </div>
                  </div>
                </div>
              </Block>

              <Block title="Matched Skills" icon={<CheckCircle2 className="h-4 w-4 text-success" />}>
                <div className="flex flex-wrap gap-2">
                  {candidate.matchedSkills.map((s) => (
                    <SkillChip key={s} label={s} variant="matched" />
                  ))}
                </div>
              </Block>

              {candidate.missingSkills.length > 0 && (
                <Block title="Missing Skills" icon={<AlertTriangle className="h-4 w-4 text-warning" />}>
                  <div className="flex flex-wrap gap-2">
                    {candidate.missingSkills.map((s) => (
                      <SkillChip key={s} label={s} variant="missing" />
                    ))}
                  </div>
                </Block>
              )}

              <Block title="Explainability" icon={<Sparkles className="h-4 w-4 text-primary" />}>
                <div className="rounded-xl border border-border bg-surface/50 p-4">
                  <p className="text-sm font-medium text-foreground">Strong fit due to:</p>
                  <ul className="mt-3 space-y-2.5">
                    {candidate.explainability.map((reason) => (
                      <li key={reason} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </Block>

            <Block title="Career History">
              <ol className="relative space-y-4 border-l border-border pl-5">
                {candidate.history?.map((job, i) => (
                  <li key={`${job.company}-${i}`} className="relative">
                    <span className="absolute -left-[1.625rem] top-1 flex h-3 w-3 items-center justify-center">
                      <span
                        className={cn(
                          "h-3 w-3 rounded-full ring-4 ring-card",
                          i === 0 ? "bg-primary" : "bg-border-strong"
                        )}
                      />
                    </span>

                    <div className="rounded-xl border border-border bg-surface/50 p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {job.role}
                        </p>

                        <span className="text-xs text-muted-foreground">
                          {job.period}
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-medium text-primary">
                        {job.company}
                      </p>

                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {job.summary}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function Block({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface/50 p-3">
      <p className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wide text-muted-foreground">
        <span className="text-muted-foreground">{icon}</span>
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
