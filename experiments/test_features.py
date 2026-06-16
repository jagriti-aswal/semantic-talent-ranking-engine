import json
from feature_extractor import extract_features

with open("data/candidates.jsonl",
          "r",
          encoding="utf-8") as f:

    first = json.loads(next(f))

features = extract_features(first)

print(features)