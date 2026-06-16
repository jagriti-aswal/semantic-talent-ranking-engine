import json
from career_score import get_career_score

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    candidate = json.loads(next(f))

text = ""

for job in candidate["career_history"]:
    text += job["description"] + " "

score = get_career_score(text)

print(score)