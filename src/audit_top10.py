import json
from scoring import calculate_score

results = []

with open("data/candidates.jsonl", "r", encoding="utf-8") as f:

    for line in f:
        candidate = json.loads(line)

        score = calculate_score(candidate)

        results.append((score, candidate))

results.sort(reverse=True, key=lambda x: x[0])

for i, (score, candidate) in enumerate(results[:10], start=1):

    print("\n" + "="*100)

    print("RANK:", i)
    print("SCORE:", score)

    print(
        "TITLE:",
        candidate["profile"]["current_title"]
    )

    print(
        "EXP:",
        candidate["profile"]["years_of_experience"]
    )

    print("\nSUMMARY:")
    print(candidate["profile"]["summary"])

    print("\nCAREER HISTORY:")

    for job in candidate["career_history"]:
        print("\nJOB:", job["title"])
        print(job["description"][:400])