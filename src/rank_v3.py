import json

from scoring import calculate_score
from final_scoring import calculate_final_score

rule_results = []

print("Stage 1: Rule Ranking...")

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

top_candidates = rule_results[:5000]

print("Stage 2: Semantic Re-ranking...")

final_results = []

for rule_score, candidate in top_candidates:

    final_score = calculate_final_score(candidate)

    final_results.append(
        (
            final_score,
            candidate["candidate_id"],
            candidate["profile"]["current_title"]
        )
    )

final_results.sort(reverse=True)

print("\nTOP 20 CANDIDATES\n")

for rank, item in enumerate(final_results[:20], start=1):

    score, cid, title = item

    print(rank, cid, title, score)