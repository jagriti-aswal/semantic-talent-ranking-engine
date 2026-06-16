import json
from semantic_score import get_semantic_score

targets = [
    "CAND_0068932",  # Top AI Engineer
    "CAND_0000001",  # Backend Engineer
    "CAND_0000024",
]

found = 0

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    for line in f:

        candidate = json.loads(line)

        cid = candidate["candidate_id"]

        if cid in targets:

            score = get_semantic_score(candidate)

            print("\n" + "=" * 60)
            print("Candidate ID:", cid)
            print("Title:", candidate["profile"]["current_title"])
            print("Experience:",
                  candidate["profile"]["years_of_experience"])
            print("Semantic Score:",
                  round(score, 4))

            found += 1

        if found == len(targets):
            break