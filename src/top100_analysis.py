import json
from collections import Counter
from scoring import calculate_score

results = []

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    for line in f:

        candidate = json.loads(line)

        score = calculate_score(candidate)

        results.append(
            (
                score,
                candidate
            )
        )

results.sort(
    key=lambda x: x[0],
    reverse=True
)

top100 = results[:100]

titles = Counter()

for score, candidate in top100:

    title = candidate["profile"]["current_title"]

    titles[title] += 1

print("\nTOP 100 TITLE DISTRIBUTION\n")

for title, count in titles.most_common(20):
    print(f"{title}: {count}")