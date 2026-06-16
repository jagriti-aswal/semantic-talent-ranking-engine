import json

file_path = "data/candidates.jsonl"

with open(file_path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f):
        candidate = json.loads(line)

        print("=" * 50)
        print("ID:", candidate["candidate_id"])
        print("Title:", candidate["profile"]["current_title"])
        print("Experience:", candidate["profile"]["years_of_experience"])

        skills = [s["name"] for s in candidate["skills"][:5]]
        print("Skills:", skills)

        if i == 4:
            break