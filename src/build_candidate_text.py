def build_candidate_text(candidate):

    profile = candidate["profile"]

    text = ""

    text += profile["current_title"] + " "

    text += profile["summary"] + " "

    for skill in candidate["skills"]:
        text += skill["name"] + " "

    for job in candidate["career_history"]:
        text += job["title"] + " "
        text += job["description"] + " "

    return text