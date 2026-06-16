def get_career_score(text):

    text = text.lower()

    score = 0

    positive_keywords = [
        "retrieval",
        "ranking",
        "recommendation",
        "search",
        "embeddings",
        "vector",
        "rag",
        "recommender",
        "ab testing",
        "a/b testing",
        "experimentation",
        "ml",
        "machine learning",
        "llm",
        "nlp",
        "production",
        "inference"
    ]

    for keyword in positive_keywords:

        if keyword in text:
            score += 1

    return score