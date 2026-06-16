import json

count = 0

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    for line in f:

        candidate = json.loads(line)

        profile = candidate["profile"]

        exp = profile["years_of_experience"]

        skills = candidate["skills"]

        skill_count = len(skills)

        if exp < 2 and skill_count > 30:
            count += 1

        elif exp > 5 and skill_count < 2:
            count += 1

print("Potential Honeypots:", count)