import json

from scoring import calculate_score
from final_scoring import calculate_final_score

with open(
    "data/candidates.jsonl",
    "r",
    encoding="utf-8"
) as f:

    for i in range(5):

        candidate = json.loads(next(f))

        rule_score = calculate_score(candidate)

        final_score = calculate_final_score(candidate)

        print("\n" + "="*60)

        print(
            candidate["profile"]["current_title"]
        )

        print(
            "Rule Score:",
            rule_score
        )

        print(
            "Hybrid Score:",
            final_score
        )