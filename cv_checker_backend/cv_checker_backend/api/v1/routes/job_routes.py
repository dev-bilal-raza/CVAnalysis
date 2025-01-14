from typing import Annotated
from fastapi import APIRouter, Depends
from cv_checker_backend.middlewares.auth_middleware import authenticate_user
from cv_checker_backend.controllers.job_controller import get_all_jobs, upload_job, upload_new_cvs, get_cvs_by_job, delete_job

jobRoute = APIRouter()

jobRoute.dependencies = [Depends(authenticate_user)]

@jobRoute.post("/add_job")
def addJob(message: Annotated[str, Depends(upload_job)]):
    if message:
        return message

@jobRoute.get("/get_all_jobs", response_model=dict)
def getAllJobs(all_jobs: Annotated[dict, Depends(get_all_jobs)]):
    print(all_jobs)
    return all_jobs

@jobRoute.get("/get_job_details", response_model=dict)
def getCVsByJob(job_details: Annotated[dict, Depends(get_cvs_by_job)]):
    if job_details:
        return job_details

@jobRoute.post("/upload_new_cvs")
def uploadCVs(message: Annotated[str, Depends(upload_new_cvs)]):
    if message:
        return message

@jobRoute.delete("/delete_job", response_model=dict)
def deleteJobs(data: Annotated[dict, Depends(delete_job)]):
    if data:
        return data