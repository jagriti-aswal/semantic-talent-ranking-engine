def generate_reasoning(candidate):

    profile = candidate["profile"]

    exp = profile["years_of_experience"]

    career_text = ""

    for job in candidate["career_history"]:
        career_text += " " + job["description"].lower()

    reasons = []

    if "recommendation" in career_text:
        reasons.append("recommendation-system experience")

    if "retrieval" in career_text:
        reasons.append("retrieval experience")

    if "ranking" in career_text:
        reasons.append("ranking-system exposure")

    if "embedding" in career_text:
        reasons.append("embeddings expertise")

    if "a/b testing" in career_text or "experimentation" in career_text:
        reasons.append("A/B testing experience")

    if "faiss" in career_text:
        reasons.append("vector-search infrastructure")

    if 5 <= exp <= 9:
        reasons.append("preferred experience range")

    if len(reasons) == 0:
        return (
            f"Relevant engineering background "
            f"with {exp:.1f} years of experience."
        )

    return (
        "Strong fit due to "
        + ", ".join(reasons[:4])
        + "."
    )