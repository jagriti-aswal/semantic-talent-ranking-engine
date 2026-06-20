import re
import ollama


def extract_skills_llm(jd_text):

    prompt = f"""
Extract all technical skills from this job description.

Rules:
- Return only technical skills.
- No explanation.
- No headings.
- No numbering.
- Comma separated values only.

Job Description:

{jd_text}
"""

    response = ollama.chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response["message"]["content"]

    # Remove common LLM prefixes
    text = re.sub(
        r"(?i)here are.*?:",
        "",
        text
    )

    text = re.sub(
        r"(?i)skills?:",
        "",
        text
    )

    skills = []

    for skill in text.split(","):

        skill = skill.strip()

        skill = re.sub(
            r"^\d+[\.\)]\s*",
            "",
            skill
        )

        skill = skill.strip(" .:-\n\t")

        if skill:
            skills.append(skill)

    return list(dict.fromkeys(skills))