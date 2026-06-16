import json
import pandas as pd

from scoring import calculate_score
from final_scoring import calculate_final_score
from reasoning import generate_reasoning

print("Stage 1: Rule-based Ranking (100k candidates)")

rule_results = []

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    for line in f:

        candidate = json.loads(line)

        rule_score = calculate_score(candidate)

        rule_results.append(
            (
                rule_score,
                candidate
            )
        )

rule_results.sort(
    reverse=True,
    key=lambda x: x[0]
)

# Keep only best candidates
TOP_K = 5000

top_candidates = rule_results[:TOP_K]

print(f"Top {TOP_K} candidates selected")

print("Stage 2: Semantic Re-ranking")

final_results = []

for rule_score, candidate in top_candidates:

    final_score = calculate_final_score(candidate)

    final_results.append(
        (
            final_score,
            candidate
        )
    )

final_results.sort(
    reverse=True,
    key=lambda x: x[0]
)

top100 = final_results[:100]

print("Stage 3: Generating Submission")

rows = []

for rank, (score, candidate) in enumerate(
    top100,
    start=1
):

    reasoning = generate_reasoning(candidate)

    rows.append(
        {
            "candidate_id":
                candidate["candidate_id"],

            "rank":
                rank,

            "score":
                round(score, 3),

            "reasoning":
                reasoning
        }
    )

submission = pd.DataFrame(rows)

submission.to_csv(
    "outputs/submission_v3.csv",
    index=False
)

print("\nSubmission saved!")
print("Location: outputs/submission_v3.csv")
print("Rows:", len(submission))