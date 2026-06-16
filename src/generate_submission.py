import json
import pandas as pd
from reasoning import generate_reasoning
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
                candidate
            )
        )

# Highest score first
results.sort(
    key=lambda x: x[0],
    reverse=True
)

top100 = results[:100]

rows = []

for rank, (score, candidate) in enumerate(top100, start=1):

    profile = candidate["profile"]
    signals = candidate["redrob_signals"]

    reasoning = generate_reasoning(candidate)

    rows.append({
        "candidate_id": candidate["candidate_id"],
        "rank": rank,
        "score": round(score, 3),
        "reasoning": reasoning
    })

submission = pd.DataFrame(rows)

submission.to_csv(
    "outputs/submission.csv",
    index=False
)

print("Submission saved!")