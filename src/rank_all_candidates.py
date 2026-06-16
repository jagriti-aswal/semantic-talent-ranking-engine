import json
from scoring import calculate_score

results = []

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    for line in f:

        candidate = json.loads(line)

        score = calculate_score(candidate)

        results.append(
            (
                score,
                candidate["candidate_id"],
                candidate["profile"]["current_title"]
            )
        )

results.sort(reverse=True)

print("\nTOP 20 CANDIDATES\n")

for rank, item in enumerate(results[:20], start=1):

    score, cid, title = item

    print(
        rank,
        cid,
        title,
        score
    )