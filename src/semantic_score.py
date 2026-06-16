from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim

model = SentenceTransformer("all-MiniLM-L6-v2")

with open("data/job_description.txt","r",encoding="utf-8") as f:
    JD_TEXT = f.read()

jd_embedding = model.encode(JD_TEXT)

def get_semantic_score(candidate):

    text = ""

    profile = candidate["profile"]

    text += profile["headline"] + " "
    text += profile["summary"] + " "

    for job in candidate["career_history"]:
        text += job["description"] + " "

    candidate_embedding = model.encode(text)

    similarity = cos_sim(
        jd_embedding,
        candidate_embedding
    ).item()

    return similarity