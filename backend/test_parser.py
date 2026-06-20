from jd_parser import extract_skills

jd = """
Senior Backend Engineer

Required:
Node.js
MongoDB
Docker
REST API
System Design
"""

print(extract_skills(jd))