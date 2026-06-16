import json

def extract_features(candidate):

    profile = candidate["profile"]
    signals = candidate["redrob_signals"]

    features = {}

    # Experience Score
    exp = profile["years_of_experience"]

    if 5 <= exp <= 9:
        features["experience_score"] = 1.0
    elif 4 <= exp < 5:
        features["experience_score"] = 0.7
    else:
        features["experience_score"] = 0.4

    # Open To Work
    features["open_to_work"] = (
        1.0 if signals["open_to_work_flag"] else 0.0
    )

    # Recruiter Response Rate
    features["response_rate"] = (
        signals["recruiter_response_rate"]
    )

    # Interview Completion
    features["interview_completion"] = (
        signals["interview_completion_rate"]
    )

    # Github Activity
    github = signals["github_activity_score"]

    if github == -1:
        github = 0

    features["github_score"] = github / 100

    return features