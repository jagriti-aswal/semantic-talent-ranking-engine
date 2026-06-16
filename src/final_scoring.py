from scoring import calculate_score
from semantic_score import get_semantic_score

def calculate_final_score(candidate):

    rule_score = calculate_score(candidate)

    semantic_score = get_semantic_score(candidate)

    semantic_score = semantic_score * 100

    final_score = (
        0.9 * rule_score
        +
        0.1 * semantic_score
    )

    return round(final_score, 2)