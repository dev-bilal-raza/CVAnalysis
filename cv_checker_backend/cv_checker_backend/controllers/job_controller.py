from typing import Annotated, Any, List
from sqlmodel import select, func
from cv_checker_backend.controllers.user_controller import get_user_from_session
from cv_checker_backend.models.job_models import Job, Cv, CvFeatures
from fastapi import Depends, UploadFile, File, HTTPException, Form
from cv_checker_backend.db.db_connector import DB_SESSION
from cv_checker_backend.controllers.openai_controller import analyze_cv_by_openai
from pypdf import PdfReader
from cv_checker_backend.common import STATUS
import re


async def upload_job(session: DB_SESSION, job_title: str = Form(None), job_description: str = Form(...), cvs: List[UploadFile] = File(...), user: dict = Depends(get_user_from_session)):
    if user["status"] is not STATUS["SUCCESS"]:
        return user
    cv_tables: List[Cv] = []
    cvs_text = []
    print(job_title)
    print(job_description)
    job_title = re.sub(" {2,}", " ", job_title.strip())
    allJobs = session.exec(
        select(Job).where(
            Job.user_id == user["user_id"],
            func.lower(Job.job_title) == job_title.lower()
        )
    ).all()
    if any(allJobs):
        return {
            "status": STATUS["ERROR"],
            "message": "Job already exists with this title."
        }

    for cv in cvs:
        try:
            reader = PdfReader(cv.file)
            pages = reader.pages
            pdf_text = "".join(str(page.extract_text()) for page in pages)
            # print(f"File Data: {str(pdf_text)}")
        except Exception as e:
            print("Error while fetching data from CV: ", e)
            return {
                "status": STATUS["ERROR"],
                "message": "Problem has been occurred while fetching data from CV."
            }
        cvs_text.append(pdf_text)
    print(cvs_text)
    response: dict[str, Any] = analyze_cv_by_openai(
        job_title, job_description, cvs_text)
    print("Result: ", response)

    if response["status"] is not STATUS["SUCCESS"]:
        return response
    else:
        try:
            results = response["data"]
            if (results and len(results) > 0):
                for cv_data in results:
                    cv_feature_table = CvFeatures(**cv_data["features"])
                    cv_table = Cv(
                        candidate_name=cv_data["candidate_name"],
                        candidate_email=cv_data["candidate_email"],
                        is_recommended=cv_data["is_recommended"],
                        recommendation_points=cv_data["recommendation_points"],
                        cv_features=cv_feature_table
                    )
                    cv_tables.append(cv_table)
                if len(cv_tables) == 0:
                    return {
                        "status": STATUS["ERROR"],
                        "message": "No valid CVs found.",
                    }
                job_table = Job(job_title=job_title,
                                job_description=job_description,
                                cvs=cv_tables,
                                user_id=user["user_id"]
                                )
                session.add(job_table)
                session.commit()
                session.refresh(job_table)
                return {
                    "status": STATUS["SUCCESS"],
                    "message": "Your candidate's CV has been successfully analyzed.",
                    "job_id":  job_table.job_id
                }
            else:
                return {
                    "status": STATUS["ERROR"],
                    "message": "Problem has been occurred while analyzing CVs.",
                }
        except Exception as e:
            print("Error while uploading job: ", e)
            return {
                "status": STATUS["ERROR"],
                "message": "Problem has been occurred while uploading job.",
            }


def get_all_jobs(user_data: Annotated[dict, Depends(get_user_from_session)], session: DB_SESSION):
    if user_data["status"] is not STATUS["SUCCESS"]:
        return user_data
    jobs = session.exec(select(Job).where(
        Job.user_id == user_data["user_id"])).all()
    if not jobs:
        return {
            "status": STATUS["NOT_FOUND"],
            "message": "Could not find any jobs."
        }
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
    return {
        "status": STATUS["SUCCESS"],
        "jobs": all_jobs
    }


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


def get_cvs_by_job(user_data: Annotated[dict, Depends(get_user_from_session)], job_id: int, session: DB_SESSION):
    try:    
        if user_data["status"] is not STATUS["SUCCESS"]:
            return user_data
        job_data = session.get(Job, job_id)
        if not job_data:
            return {
                "status": STATUS["NOT_FOUND"],
                "message": "Could not find any job with this id."
            }
        job_details: dict[str, Any] = {
            "job_title": job_data.job_title,
            "cvs": []
        }
        for cv in job_data.cvs:
            cv_details = {
                **cv.model_dump(),
                "cv_features": cv.cv_features
            }
            job_details["cvs"].append(cv_details)
        print("job details: ", job_details)
        return {
            "status": STATUS["SUCCESS"],
            "job_details": job_details
        }
    except Exception as e:
        print("Error while getting job details: ", e)
        return {
            "status": STATUS["ERROR"],
            "message": "Something went wrong while getting job details. Please refresh the page and try again."
        }


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


def delete_job(job_id: int, user_data: Annotated[dict, Depends(get_user_from_session)], session: DB_SESSION):
    print("Job Id: ", job_id)
    print("User Data: ", user_data)
    if user_data["status"] is not STATUS["SUCCESS"]:
        return user_data
    # Retrieve the job with the specified job_id
    job_table = session.get(Job, job_id)
    # If the job does not exist, raise a 404 exception
    if not job_table:
        return {
            "status": STATUS["NOT_FOUND"],
            "message": f"Job not found with this ID: {job_id}"
        }
    try:
        # Delete all related Cv records
        for cv in job_table.cvs:
            # If cv_features also needs to be deleted
            if cv.cv_features:
                session.delete(cv.cv_features)
            session.delete(cv)

        # Delete the actual job record
        session.delete(job_table)
        session.commit()
        # Get updated jobs list
        data = get_all_jobs(user_data, session)
        data.update({
            "message": "Job has been successfully deleted."
        })
        return data

    except Exception as e:
        print(f"Error occured while deleting job: {str(e)}")
        session.rollback()
        return {
            "status": STATUS["ERROR"],
            "message": f"Something went wrong while deleting job. Please try again."
        }
