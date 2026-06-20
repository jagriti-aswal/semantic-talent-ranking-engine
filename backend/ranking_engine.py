import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.append(str(ROOT / "src"))

from scoring import calculate_score
from final_scoring import calculate_final_score
from reasoning import generate_reasoning
from jd_parser_llm import extract_skills_llm
from matching import extract_matched_skills
BACKEND_DIR = Path(__file__).resolve().parent
DEFAULT_FILE = ROOT / "data" / "candidates.jsonl"
UPLOADED_FILE = BACKEND_DIR /"data"/"current_dataset.jsonl"




def run_ranking_pipeline(job_description):
    data_file = (
        UPLOADED_FILE
        if UPLOADED_FILE.exists()
        else DEFAULT_FILE
    )
    jd_skills = extract_skills_llm(
        job_description
    )
    print("\nJD SKILLS:")
    print(jd_skills)
    print()
    rule_results = []

    print("Stage 1: Rule-Based Ranking Started")

    with open(
        data_file,
        "r",
        encoding="utf-8"
    ) as f:

        for line in f:

            candidate = json.loads(line)

            rule_score = calculate_score(
                candidate,
                jd_skills
            )

            rule_results.append(
                (
                    rule_score,
                    candidate
                )
            )

    rule_results.sort(
        reverse=True,
        key=lambda x: x[0]
    )

    TOP_K = 5000

    top_candidates = rule_results[:TOP_K]

    print(f"Top {TOP_K} candidates selected")

    print("Stage 2: Semantic Re-ranking Started")

    final_results = []

    for rule_score, candidate in top_candidates:

        final_score = calculate_final_score(
            candidate,
            job_description
        )

        final_results.append(
            (
                final_score,
                candidate
            )
        )

    final_results.sort(
        reverse=True,
        key=lambda x: x[0]
    )

    top100 = final_results[:100]

    print("Stage 3: Generating Results")

    results = []

    for rank, (score, candidate) in enumerate(
        top100,
        start=1
    ):

        if rank == 1:

            print("\n========== DEBUG ==========")

            print("\nTITLE:")
            print(
                candidate["profile"]["current_title"]
            )

            print("\nCAREER HISTORY SAMPLE:")
            print(
                candidate["career_history"][0]["description"][:1000]
            )

            print("\nJD SKILLS:")
            print(jd_skills)

            print("\n===========================\n")
            print("\nCAREER HISTORY SAMPLE:")
            print(candidate["career_history"][0])


        reasoning = generate_reasoning(
            candidate,
            jd_skills
        )

        matched_skills = extract_matched_skills(
            candidate,
            jd_skills
        )

        print(
            f"Rank {rank} | "
            f"{candidate['candidate_id']} | "
            f"MATCHED = {matched_skills}"
        )

        results.append(
            {
                "candidate_id":
                    candidate["candidate_id"],

                "rank":
                    rank,

                "score":
                    round(score, 2),

                "reasoning":
                    reasoning,

                "current_role":
                    candidate["profile"]["current_title"],

                "experience":
                    candidate["profile"]["years_of_experience"],

                "location":
                    candidate["profile"]["location"],

                "matched_skills":
                    matched_skills,
                "career_history":
                    candidate["career_history"]
            }
        )

    print("TOTAL RESULTS =", len(results))

    if len(results) > 0:

        print("FIRST =", results[0])

        print("LAST =", results[-1])

    return results