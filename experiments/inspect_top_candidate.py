# inspect_top_candidate.py

import json

TARGETS = [
"CAND_0068932",
"CAND_0062247",
"CAND_0058688"
]

with open("data/candidates.jsonl","r",encoding="utf-8") as f:

    for line in f:

        candidate = json.loads(line)

        if candidate["candidate_id"] in TARGETS:

            print(candidate["profile"])
            print("\nCAREER HISTORY\n")

            for job in candidate["career_history"]:
                print(job["title"])
                print(job["description"])
                print()

            break