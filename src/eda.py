import json
from collections import Counter

titles = Counter()
skills = Counter()

interesting_keywords = [
    "retrieval",
    "search",
    "ranking",
    "recommendation",
    "embedding",
    "vector",
    "a/b testing",
    "ab testing",
    "experimentation"
]

keyword_counts = {k: 0 for k in interesting_keywords}

total_candidates = 0
total_experience = 0

with open("data/candidates.jsonl", "r", encoding="utf-8") as f:

    for line in f:

        candidate = json.loads(line)

        total_candidates += 1

        profile = candidate["profile"]

        # Title stats
        title = profile["current_title"]
        titles[title] += 1

        # Experience stats
        total_experience += profile["years_of_experience"]

        # Skills stats
        for skill in candidate["skills"]:
            skills[skill["name"]] += 1

        # Career-history keyword stats
        career_text = ""

        for job in candidate["career_history"]:
            career_text += " " + job["description"].lower()

        for keyword in interesting_keywords:
            if keyword in career_text:
                keyword_counts[keyword] += 1

print("=" * 60)
print("DATASET OVERVIEW")
print("=" * 60)

print(f"Total Candidates: {total_candidates}")
print(f"Average Experience: {total_experience / total_candidates:.2f} years")

print("\n" + "=" * 60)
print("TOP 20 TITLES")
print("=" * 60)

for title, count in titles.most_common(20):
    print(f"{title}: {count}")

print("\n" + "=" * 60)
print("TOP 20 SKILLS")
print("=" * 60)

for skill, count in skills.most_common(20):
    print(f"{skill}: {count}")

print("\n" + "=" * 60)
print("CAREER HISTORY KEYWORD COUNTS")
print("=" * 60)

for keyword, count in keyword_counts.items():
    print(f"{keyword}: {count}")