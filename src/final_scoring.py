from scoring import calculate_score
from semantic_score import get_semantic_score
from jd_parser import extract_skills

def calculate_final_score(
    candidate,
    jd_text
):

    jd_skills = extract_skills(
        jd_text
    )

    rule_score = calculate_score(
        candidate,
        jd_skills
    )

    semantic_score = get_semantic_score(
        candidate,
        jd_text
    )

    semantic_score = semantic_score * 100

    final_score = (
        0.9 * rule_score
        +
        0.1 * semantic_score
    )

    return round(final_score, 2)