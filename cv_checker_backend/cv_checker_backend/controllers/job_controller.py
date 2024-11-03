from typing import Annotated, Any, List
from sqlmodel import select
from cv_checker_backend.controllers.user_controller import get_user_from_session
from cv_checker_backend.models.job_models import Job, Cv, CvFeatures
from fastapi import Depends, UploadFile, File, HTTPException, Form
from cv_checker_backend.db.db_connector import DB_SESSION
from cv_checker_backend.controllers.openai_controller import analyze_cv_by_openai
from pypdf import PdfReader


async def upload_job(session: DB_SESSION, job_title: str = Form(...), job_description: str = Form(...), cvs: List[UploadFile] = File(...)):
    cv_tables: List[Cv] = []
    cvs_text = []
    print(job_title)
    print(job_description)
    for cv in cvs:
        try:
            reader = PdfReader(cv.file)
            pages = reader.pages
            pdf_text = "".join(str(page.extract_text()) for page in pages)
            print(f"File Data: {str(pdf_text)}")
        except Exception as e:
            print("Error while fetching data from CV: ", e)
            raise HTTPException(status_code=400, detail=str(e))
        cvs_text.append(pdf_text)
    cvs_results: List[dict] = analyze_cv_by_openai(
        job_title, job_description, cvs_text)
    print(cvs_results)
    # for cv_data in cvs_results:
    #     cv_feature_table = CvFeatures(**cv_data["features"])
    #     cv_table = Cv(
    #         candidate_name=cv_data["candidate_name"],
    #         candidate_email=cv_data["candidate_email"],
    #         is_recommended=cv_data["is_recommended"],
    #         recommendation_points=cv_data["recommendation_points"],
    #         cv_features=cv_feature_table
    #     )
    #     cv_tables.append(cv_table)
    # job_table = Job(job_title=job_title,
    #                 job_description=job_description, cvs=cv_tables)
    # session.add(job_table)
    # session.commit()
    # session.refresh(job_table)
    return {
        "message" : "Your candidate's CV has been successfully analyze with the specific job description.",
        # "job_id":  job_table.job_id
        }


def get_all_jobs(user_data: Annotated[dict, Depends(get_user_from_session)], session: DB_SESSION):
    jobs = session.exec(select(Job).where(Job.user_id == user_data["user_id"])).all()
    all_jobs = []
    for job in jobs:
        cvs = len(job.cvs)
        all_jobs.append(
            {
                "job_id": job.job_id,
                "job_title": job.job_title,
                "job_description": job.job_description,
                "cv_count": cvs
            }
        )
    return "all_jobs"

def get_all_applicants(user_id: str, session: DB_SESSION):
    jobs = session.exec(select(Job).where(Job.user_id == user_id)).all()
    all_applicants = []
    for job in jobs:
        for cv in job.cvs:        
            applicants = {
                "cv_id": cv.cv_id,
                "candidate_name": cv.candidate_name,
                "candidate_email": cv.candidate_email,
                "candidate_email": cv.candidate_email,
                "job_title": job.job_title,
                "cv_features": cv.cv_features
                } 
            all_applicants.append(applicants)
    return all_applicants


def get_cvs_by_job_func(job_id: int, session: DB_SESSION):
    job_data = session.get(Job, job_id)
    if not job_data:
        raise HTTPException(
            status_code=404, detail=f"Job not found from this id: {job_id}")
    job_details: dict[str, Any] = {
        "job_title": job_data.job_title,
        "cvs": []
    }
    for cv in job_data.cvs:
        cv_details = {
            **cv.model_dump(),
            "features": cv.cv_features
        }
        job_details["cvs"].append(cv_details)
    return job_details


def upload_new_cvs(session: DB_SESSION, job_id: int, cvs: List[UploadFile] = File(...)):
    job_details = session.exec(select(Job).where(
        Job.job_id == job_id)).one_or_none()
    if not job_details:
        raise HTTPException(
            status_code=404, detail=f"Job not found from this id:{job_id}")
    cvs_text = []
    for cv in cvs:
        try:
            reader = PdfReader(cv.file)
            pages = reader.pages
            pdf_text = "".join(str(page.extract_text()) for page in pages)
            print(f"File Data: {str(pdf_text)}")
        except Exception as e:
            print("Error while fetching data from CV: ", e)
            raise HTTPException(status_code=400, detail=str(e))
        cvs_text.append(pdf_text)
    cvs_results = analyze_cv_by_openai(
        job_title=job_details.job_title,
        job_description=job_details.job_description,
        cvs=cvs_text
    )
    # Append each CV to the job's CVs
    for cv_data in cvs_results:
        cv_feature_table = CvFeatures(**cv_data["features"])
        cv_table = Cv(
            candidate_name=cv_data["candidate_name"],
            candidate_email=cv_data["candidate_email"],
            is_recommended=cv_data["is_recommended"],
            recommendation_points=cv_data["recommendation_points"],
            cv_features=cv_feature_table
        )
        job_details.cvs.append(cv_table)
    session.add(job_details)
    session.commit()
    return f"New Cvs has been uploaded successfully for {job_details.job_title} Job."


def delete_job(job_id: int, session: DB_SESSION):
    # Retrieve the job with the specified job_id
    job_table = session.get(Job, job_id)
    # If the job does not exist, raise a 404 exception
    if not job_table:
        raise HTTPException(
            status_code=404, detail=f"Job not found with this ID: {job_id}")
    session.delete(job_table)
    session.commit()
    return f"Job description has been updated successfully for the job with ID: {job_id}."
