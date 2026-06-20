from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim

model = None


def get_model():
    global model

    if model is None:
        print("Loading SentenceTransformer model...")

        model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

        print("Model loaded successfully!")

    return model


def get_semantic_score(
    candidate,
    jd_text
):

    model = get_model()

    text = ""

    profile = candidate["profile"]

    text += profile["headline"] + " "
    text += profile["summary"] + " "

    for job in candidate["career_history"]:
        text += (
            job["description"]
            + " "
        )

    jd_embedding = model.encode(
        jd_text
    )

    candidate_embedding = model.encode(
        text
    )

    similarity = cos_sim(
        jd_embedding,
        candidate_embedding
    ).item()

    return similarity