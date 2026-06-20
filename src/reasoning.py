def generate_reasoning(
    candidate,
    jd_skills
):

    profile = candidate["profile"]

    exp = profile["years_of_experience"]

    current_role = profile["current_title"]

    career_text = ""

    for job in candidate["career_history"]:
        career_text += (
            job["description"].lower()
            + " "
        )

    matched_skills = []

    for skill in jd_skills:

        if skill.lower() in career_text:

            matched_skills.append(skill)

    reasons = []

    if matched_skills:

        reasons.append(
            f"matching skills ({', '.join(matched_skills[:3])})"
        )

    reasons.append(
        f"{exp:.1f} years of experience"
    )

    reasons.append(
        f"current role as {current_role}"
    )

    return (
        "Strong fit due to "
        + ", ".join(reasons)
        + "."
    )