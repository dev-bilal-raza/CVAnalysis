# CV Checker Project

## Introduction

This project is a CV checker that allows users to upload their CVs and job descriptions to analyze and provide recommendations.

## Requirements

* Python 3.8+
* FastAPI
* SQLAlchemy
* Pydantic
* OpenAI

## Installation

1. Clone the repository
2. Install the required packages using pip: `pip install -r requirements.txt`
3. Create a new database using the `create_db_and_tables()` function in `main.py`

## Usage

1. Run the application using `uvicorn main:app --host 0.0.0.0 --port 8000`
2. Open a web browser and navigate to `http://localhost:8000`
3. Use the API endpoints to upload CVs and job descriptions, and retrieve recommendations

## API Endpoints

### Job Controller

* `POST /api/v1/add_job`: Upload a new job with CVs
* `GET /api/v1/get_all_jobs`: Retrieve all jobs for a user
* `GET /api/v1/get_all_applicants`: Retrieve all applicants for a user
* `GET /api/v1/get_cvs_by_job`: Retrieve CVs for a specific job
* `POST /api/v1/upload_new_cvs`: Upload new CVs for a specific job
* `DELETE /api/v1/delete_job`: Delete a job

### OpenAI Controller

* `POST /api/v1/analyze_cv_by_openai`: Analyze a CV using OpenAI

### User Controller

* `POST /api/v1/create_user`: Create a new user
* `GET /api/v1/get_user_from_session`: Retrieve a user from session

### Auth Routes

* `GET /api/v1/auth/google/login`: Login using Google OAuth
* `GET /api/v1/auth/google/callback`: Google OAuth callback
* `GET /api/v1/auth/github/login`: Login using GitHub OAuth
* `GET /api/v1/auth/github/callback`: GitHub OAuth callback

## Models

### Job Model

* `JobBase`: Base model for jobs
* `Job`: Job model with foreign key to user
* `Cv`: CV model with foreign key to job
* `CvFeatures`: CV features model with foreign key to CV

### User Model

* `User`: User model with foreign key to job

## Tests

* `test_upload_job_with_cvs`: Test uploading a job with CVs
* `test_upload_job_with_image_cv`: Test uploading a job with an image CV
