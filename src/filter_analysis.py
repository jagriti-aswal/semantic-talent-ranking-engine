import json

count = 0

with open("data/candidates.jsonl", "r", encoding="utf-8") as f:

    for line in f:

        candidate = json.loads(line)

        exp = candidate["profile"]["years_of_experience"]

        title = candidate["profile"]["current_title"].lower()

        ai_words = [
            "ai",
            "ml",
            "machine learning",
            "data scientist",
            "software",
            "backend",
            "cloud",
            "search",
            "recommendation",
            "engineer"
        ]

        if exp >= 4 and any(
            word in title
            for word in ai_words
        ):
            count += 1

print(count)