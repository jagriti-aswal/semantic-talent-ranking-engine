import json

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    for line in f:

        candidate = json.loads(line)

        if candidate["profile"]["current_title"] == "HR Manager":

            print(candidate["candidate_id"])
            break