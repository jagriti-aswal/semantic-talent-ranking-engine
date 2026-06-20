import re
import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


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

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    text = response.choices[0].message.content

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