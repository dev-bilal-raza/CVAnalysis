from typing import Annotated
from fastapi import APIRouter, Depends

from cv_checker_backend.controllers.job_controller import get_all_jobs, upload_job, upload_new_cvs, get_cvs_by_job_func

jobRoute = APIRouter()


@jobRoute.post("/api/v1/add_job")
def add_job(message: Annotated[str, Depends(upload_job)]):
    if message:
        return message


@jobRoute.get("/api/v1/get_all_jobs", response_model=list[dict])
def read_all_jobs(all_jobs: Annotated[dict, Depends(get_all_jobs)]):
    print(all_jobs)
    return all_jobs

@jobRoute.get("/api/v1/get_job_details", response_model=list[dict])
def get_cvs_by_job(job_details: Annotated[str, Depends(get_cvs_by_job_func)]):
    if job_details:
        return job_details

@jobRoute.post("/api/v1/upload_new_cvs")
def upload_cvs(message: Annotated[str, Depends(upload_new_cvs)]):
    if message:
        return message