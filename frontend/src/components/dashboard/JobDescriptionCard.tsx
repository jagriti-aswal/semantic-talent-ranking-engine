import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { SkillChip } from "./SkillChip";

const PLACEHOLDER = `Senior Backend Engineer

Requirements:
Node.js
Docker
AWS
Microservices
System Design`;

export function JobDescriptionCard({
  value,
  onChange,
  extractedSkills,
  onRank,
  isRanking,
}: {
  value: string;
  onChange: (value: string) => void;
  extractedSkills: string[];
  onRank: () => void;
  isRanking: boolean;
}) {
  return (
    <section className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-sm font-semibold text-foreground">Job Description</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Paste a role to extract skills and rank
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary-muted px-2.5 py-1 text-xs font-medium text-primary">
          <Wand2 className="h-3.5 w-3.5" />
          Auto-extract
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={PLACEHOLDER}
        spellCheck={false}
        className="mt-4 min-h-[200px] w-full flex-1 resize-y rounded-xl border border-input bg-surface/50 p-4 font-mono text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-ring/30 scrollbar-thin"
      />

      <div className="mt-4">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Extracted Skills
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {extractedSkills.length > 0 ? (
            extractedSkills.map((skill) => (
              <SkillChip key={skill} label={skill} variant="matched" />
            ))
          ) : (
            <span className="text-xs text-muted-foreground/70">
              Skills will appear here as you type the description.
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onRank}
        disabled={isRanking}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isRanking ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Ranking candidates…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Rank Candidates
          </>
        )}
      </button>
    </section>
  );
}
