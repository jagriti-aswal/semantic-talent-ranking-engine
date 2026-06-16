import json
from semantic_score import get_semantic_score

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    candidate = json.loads(next(f))

print(
    get_semantic_score(candidate)
)