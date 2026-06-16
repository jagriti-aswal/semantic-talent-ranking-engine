import json

count = 0

interesting_titles = [
    "ML Engineer",
    "Data Engineer",
    "Backend Engineer",
    "Senior Data Engineer",
    "Senior Software Engineer"
]

with open("data/candidates.jsonl","r",encoding="utf-8") as f:

    for line in f:

        candidate = json.loads(line)

        title = candidate["profile"]["current_title"]

        if title in interesting_titles:

            print("\n" + "="*100)
            print("TITLE:",title)
            print("EXP:",candidate["profile"]["years_of_experience"])

            print("\nCAREER HISTORY:")

            for job in candidate["career_history"]:

                print(job["description"][:500])

            count += 1

            if count == 5:
                break