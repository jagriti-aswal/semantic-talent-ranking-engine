import json
from collections import Counter

titles = Counter()

with open("data/candidates.jsonl","r",encoding="utf-8") as f:

    for line in f:

        candidate = json.loads(line)

        exp = candidate["profile"]["years_of_experience"]

        if exp >= 5:

            title = candidate["profile"]["current_title"]

            titles[title] += 1

print("\nTop Titles (5+ years):\n")

for title,count in titles.most_common(30):
    print(title,count)