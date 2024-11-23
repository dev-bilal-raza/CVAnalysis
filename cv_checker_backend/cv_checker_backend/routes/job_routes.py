from typing import Annotated
from fastapi import APIRouter, Depends
from cv_checker_backend.controllers.job_controller import get_all_jobs, upload_job, upload_new_cvs, get_cvs_by_job, delete_job

jobRoute = APIRouter()

@jobRoute.post("/api/v1/add_job")
def addJob(message: Annotated[str, Depends(upload_job)]):
    if message:
        return message

@jobRoute.get("/api/v1/get_all_jobs", response_model=dict)
def getAllJobs(all_jobs: Annotated[dict, Depends(get_all_jobs)]):
    print(all_jobs)
    return all_jobs

@jobRoute.get("/api/v1/get_job_details", response_model=dict)
def getCVsByJob(job_details: Annotated[dict, Depends(get_cvs_by_job)]):
    if job_details:
        return job_details

@jobRoute.post("/api/v1/upload_new_cvs")
def uploadCVs(message: Annotated[str, Depends(upload_new_cvs)]):
    if message:
        return message

@jobRoute.delete("/api/v1/delete_job", response_model=dict)
def deleteJobs(data: Annotated[dict, Depends(delete_job)]):
    if data:
        return data