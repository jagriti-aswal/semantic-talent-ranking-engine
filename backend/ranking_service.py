from ranking_engine import run_ranking_pipeline


def rank_candidates(job_description):

    results = run_ranking_pipeline(
        job_description
    )

    return results