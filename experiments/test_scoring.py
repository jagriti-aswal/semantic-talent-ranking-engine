import json
from scoring import calculate_score

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    candidate = json.loads(next(f))

print(candidate["candidate_id"])
print(candidate["profile"]["current_title"])
print(candidate["profile"]["years_of_experience"])

print("\nCareer History:")
for job in candidate["career_history"]:
    print("-", job["title"])

print("\nFinal Score:")
print(calculate_score(candidate))