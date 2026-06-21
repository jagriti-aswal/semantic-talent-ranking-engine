import { useState } from "react";
import {
  // MOCK_CANDIDATES,
  MOCK_DATASET,
  type Candidate,
} from "../data/candidates";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DatasetCard } from "../components/dashboard/DatasetCard";
import { JobDescriptionCard } from "../components/dashboard/JobDescriptionCard";
import { ResultsTable } from "../components/dashboard/ResultsTable";
import { CandidateDrawer } from "../components/dashboard/CandidateDrawer";
import { EmptyState } from "../components/dashboard/EmptyState";


// const KNOWN_SKILLS = [
//   "Node.js",
//   "Docker",
//   "AWS",
//   "Microservices",
//   "System Design",
//   "Kubernetes",
//   "GraphQL",
//   "PostgreSQL",
//   "TypeScript",
//   "Kafka",
//   "Terraform",
//   "Redis",
// ];

// function extractSkills(text: string): string[] {
//   if (!text.trim()) return [];
//   const lower = text.toLowerCase();
//   const found = KNOWN_SKILLS.filter((s) => lower.includes(s.toLowerCase()));
//   return found.length > 0 ? found : DEFAULT_EXTRACTED_SKILLS;
// }

export default function Dashboard() {
  const [jobDescription, setJobDescription] = useState("");
  const [isRanking, setIsRanking] = useState(false);
  const [ranked, setRanked] = useState<Candidate[] | null>(null);
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [extractedSkills, setExtractedSkills] =
    useState<string[]>([]);

  // const extractedSkills = useMemo(() => extractSkills(jobDescription), [jobDescription]);

const handleRank = async () => {
  setIsRanking(true);

  try {
    const response = await fetch(
      "https://jagriti-aswal-semantic-talent-ranking-engine.hf.space/rank",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
        }),
      }
    );

    const data = await response.json();
    setExtractedSkills(
      data.extracted_skills || []
    );

const formatted = data.candidates.map((c: any) => ({
  id: c.candidate_id,

  rank: c.rank,

  score: c.score,

  currentRole: c.current_role,

  experienceYears: c.experience,

  location: c.location,

  matchedSkills: c.matched_skills || [],

  missingSkills: [],

  history:
    c.career_history?.map((job: any) => ({
      role: job.title,
      company: job.company,
      period: `${job.duration_months} months`,
      summary: job.description,
    })) || [],

  explainability: [c.reasoning],

  reasoning: c.reasoning
}));
console.log("FIRST HISTORY", formatted[0].history);
setRanked(formatted);

  } catch (error) {
    console.error(error);
  } finally {
    setIsRanking(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader totalCandidates={MOCK_DATASET.candidatesLoaded} />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DatasetCard dataset={MOCK_DATASET} />
          <JobDescriptionCard
            value={jobDescription}
            onChange={setJobDescription}
            extractedSkills={extractedSkills}
            onRank={handleRank}
            isRanking={isRanking}
          />
        </div>

        {ranked ? (
          <ResultsTable candidates={ranked} onSelect={setSelected} />
        ) : (
          <EmptyState />
        )}
      </main>

      <CandidateDrawer candidate={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
