import json
from collections import Counter

skills = Counter()

with open("data/candidates.jsonl", "r", encoding="utf-8") as f:

    for line in f:

        candidate = json.loads(line)

        for skill in candidate["skills"]:
            skills[skill["name"]] += 1

print("\nTop 50 Skills:\n")

for skill, count in skills.most_common(50):
    print(skill, count)