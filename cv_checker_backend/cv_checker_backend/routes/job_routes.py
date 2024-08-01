from typing import Annotated
from fastapi import APIRouter, Depends

from cv_checker_backend.controllers.job_controller import get_all_jobs, upload_job, upload_new_cvs

jobRoute = APIRouter()


@jobRoute.post("/api/v1/add_job")
def add_job(message: Annotated[str, Depends(upload_job)]):
    if message:
        return message


@jobRoute.get("/api/v1/jobs")
def read_all_jobs(all_jobs: Annotated[dict, Depends(get_all_jobs)]):
    print(all_jobs)
    return all_jobs


@jobRoute.post("/api/v1/upload_new_cvs")
def upload_cvs(message: Annotated[str, Depends(upload_new_cvs)]):
    if message:
        return message