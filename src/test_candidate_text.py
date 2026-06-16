import json

from build_candidate_text import build_candidate_text

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    candidate = json.loads(next(f))

text = build_candidate_text(candidate)

print(text[:1500])