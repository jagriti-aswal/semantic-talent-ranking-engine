import re

def extract_skills(jd_text: str):

    jd_text = jd_text.lower()

    skill_bank = [
        "python",
        "java",
        "c++",
        "javascript",
        "typescript",
        "react",
        "node.js",
        "mongodb",
        "sql",
        "docker",
        "kubernetes",
        "aws",
        "machine learning",
        "deep learning",
        "nlp",
        "llm",
        "retrieval",
        "ranking",
        "recommendation",
        "vector search",
        "faiss",
        "pinecone",
        "system design",
        "rest api"
    ]

    found_skills = []

    for skill in skill_bank:

        if skill in jd_text:
            found_skills.append(skill)

    return found_skills