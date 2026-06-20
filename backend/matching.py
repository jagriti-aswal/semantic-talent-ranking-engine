def extract_matched_skills(
    candidate,
    jd_skills
):

    profile = candidate["profile"]

    title = profile["current_title"].lower()

    career_text = title + " "

    for job in candidate["career_history"]:

        career_text += (
            job["description"].lower()
            + " "
        )

    matched = []

    skill_aliases = {
        "Machine Learning": [
            "machine learning",
            "ml"
        ],

        "LLM": [
            "llm",
            "large language model",
            "transformer"
        ],

        "NLP": [
            "nlp",
            "natural language processing"
        ],

        "Embeddings": [
            "embedding",
            "embeddings"
        ],

        "Retrieval Systems": [
            "retrieval",
            "search"
        ],

        "Recommendation Systems": [
            "recommendation",
            "recommender"
        ],

        "Vector Search": [
            "vector search"
        ],

        "FAISS": [
            "faiss"
        ]
    }

    for skill in jd_skills:

        aliases = skill_aliases.get(
            skill,
            [skill.lower()]
        )

        for alias in aliases:

            if alias in career_text:

                matched.append(skill)
                break

    return list(set(matched))[:5]