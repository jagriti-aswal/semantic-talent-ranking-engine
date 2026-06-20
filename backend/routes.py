from fastapi import APIRouter, UploadFile, File
from schemas import RankRequest
from ranking_service import rank_candidates

from jd_parser import extract_skills

from pathlib import Path
import shutil

router = APIRouter()

DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)


@router.get("/health")
def health():
    return {
        "status": "ok"
    }


@router.post("/upload-dataset")
async def upload_dataset(
    file: UploadFile = File(...)
):

    save_path = (
        DATA_DIR /
        "current_dataset.jsonl"
    )

    with open(
        save_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {
        "message":
            "Dataset uploaded successfully",

        "filename":
            file.filename
    }


@router.post("/rank")
def rank(request: RankRequest):

    candidates = rank_candidates(
        request.jobDescription
    )

    extracted_skills = extract_skills(
        request.jobDescription
    )

    return {
        "candidates": candidates,
        "extracted_skills": extracted_skills
    }