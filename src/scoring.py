def calculate_score(candidate):

    profile = candidate["profile"]
    signals = candidate["redrob_signals"]

    score = 0.0

    # ------------------------
    # 1. Experience Score (20)
    # ------------------------
    exp = profile["years_of_experience"]

    if 5 <= exp <= 9:
        score += 20
    elif 4 <= exp < 5:
        score += 15
    elif 9 < exp <= 12:
        score += 12
    else:
        score += 5

    # ------------------------
    # 2. Career Relevance (40)
    # ------------------------
    career_text = ""

    for job in candidate["career_history"]:
        career_text += " " + job["description"].lower()

    keyword_weights = {
        "retrieval": 30,
        "ranking": 25,
        "re-ranking": 25,
        "recommendation": 25,
        "recommender": 25,
        "collaborative filtering": 20,
        "matrix factorization": 20,

        "embedding": 20,
        "embeddings": 20,
        "vector": 30,

        "a/b testing": 15,
        "experimentation": 15,
        "evaluation": 15,

        "production": 15,
        "deployment": 15,
        "inference": 15,

        "llm": 10,
        "nlp": 10,

        "search": 5,
        "ndcg": 25,
        "mrr": 25,
        "map": 20,
        "recall@k": 20,

        "learning-to-rank": 30,
        "ltr": 20,

        "hybrid retrieval": 30,

        "faiss": 25,
        "pinecone": 20,
        "qdrant": 20,
        "milvus": 20,

        "bm25": 20,
    }

    career_score = 0

    for keyword, weight in keyword_weights.items():
        if keyword in career_text:
            career_score += weight

    career_score = min(career_score, 40)

    score += career_score

    # ------------------------
    # 3. Behavioral Signals (20)
    # ------------------------
    behavior_score = 0

    if signals["open_to_work_flag"]:
        behavior_score += 5

    behavior_score += (
        signals["recruiter_response_rate"] * 8
    )

    behavior_score += (
        signals["interview_completion_rate"] * 7
    )

    github = signals["github_activity_score"]

    if github != -1:
        behavior_score += (github / 100) * 5

    score += behavior_score

    # ------------------------
    # 4. Logistics Score (10)
    # ------------------------
    logistics_score = 0

    notice = signals["notice_period_days"]

    if notice <= 30:
        logistics_score += 5
    elif notice <= 60:
        logistics_score += 3

    if signals["willing_to_relocate"]:
        logistics_score += 5

    score += logistics_score

    # ------------------------
    # 5. Title Bonus (10)
    # ------------------------
    title = profile["current_title"].lower()
    bad_titles = [
        "marketing manager",
        "sales executive",
        "hr manager",
        "accountant",
        "content writer",
        "customer support",
        "operations manager",
        "mechanical engineer",
        "civil engineer"
    ]

    if title in bad_titles:
        score -= 25

    good_titles = [
        "ml engineer",
        "data engineer",
        "backend engineer",
        "senior data engineer",
        "senior software engineer",
        "software engineer",
        "ai engineer"
    ]
    

    for t in good_titles:
        if t in title:
            score += 3
            break

    return round(score, 2)