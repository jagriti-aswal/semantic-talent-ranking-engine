# inspect_marketing.py

import json
from scoring import calculate_score

results = []

with open("data/candidates.jsonl","r",encoding="utf-8") as f:
    for line in f:
        candidate = json.loads(line)

        if candidate["profile"]["current_title"] == "Marketing Manager":

            score = calculate_score(candidate)

            results.append((score,candidate))

results.sort(reverse=True,key=lambda x:x[0])

for score,candidate in results[:3]:

    print("\n" + "="*80)
    print("Score:",score)
    print("ID:",candidate["candidate_id"])
    print("Title:",candidate["profile"]["current_title"])
    print("Summary:")
    print(candidate["profile"]["summary"])

    print("\nCareer History:")

    for job in candidate["career_history"]:
        print(job["title"])
        print(job["description"])