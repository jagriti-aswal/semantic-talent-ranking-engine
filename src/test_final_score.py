import json

from final_scoring import calculate_final_score

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    candidate = json.loads(next(f))

score = calculate_final_score(candidate)

print(score)