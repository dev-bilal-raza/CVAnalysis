from fastapi.testclient import TestClient
from cv_checker_backend.controllers.job_controller import upload_job
from cv_checker_backend.db.db_connector import create_db_and_tables
from cv_checker_backend.main import app

# Create the database and tables before running the test
create_db_and_tables()

client = TestClient(app)

def test_upload_job_with_image_cv():
    # Prepare the test data
    job_title = "Software Engineer"
    job_description = "Develop and maintain software applications"
    cvs = [
        {
            "filename": "cv_with_image.pdf",
            "file": open("path/to/cv_with_image.pdf", "rb")
        }
    ]

    # Make the API request
    response = client.post(
        "/api/v1/add_job",
        data={
            "job_title": job_title,
            "job_description": job_description
        },
        files=cvs
    )

    # Assert the response status code
    assert response.status_code == 200

    # Assert the response data
    response_data = response.json()
    assert response_data["message"] == "Your candidate's CV has been successfully analyze with the specific job description."

# Run the unit test
test_upload_job_with_image_cv()from fastapi.testclient import TestClient
from cv_checker_backend.controllers.job_controller import upload_job
from cv_checker_backend.db.db_connector import DB_SESSION
from cv_checker_backend.models.job_models import Job, Cv, CvFeatures
from fastapi import UploadFile, Form

# Create a TestClient instance
client = TestClient(upload_job)

# Define the test case
def test_upload_job_with_cvs():
    # Define the test data
    job_title = "Software Developer"
    job_description = "Experienced software developer with 5 years of experience in Python and React."
    cvs = [
        UploadFile(filename="cv1.pdf", file=b"CV content 1"),
        UploadFile(filename="cv2.pdf", file=b"CV content 2")
    ]

    # Make the API request
    response = client.post(
        "/api/v1/add_job",
        data={"job_title": job_title, "job_description": job_description},
        files=cvs
    )

    # Assert the response status code
    assert response.status_code == 200

    # Assert the response content
    response_content = response.json()
    assert response_content["message"] == "Your candidate's CV has been successfully analyze with the specific job description."

    # Retrieve the saved job from the database
    with DB_SESSION() as session:
        saved_job = session.exec(select(Job).where(Job.job_title == job_title)).one_or_none()

    # Assert the saved job details
    assert saved_job is not None
    assert saved_job.job_title == job_title
    assert saved_job.job_description == job_description

    # Assert the saved CVs details
    assert len(saved_job.cvs) == len(cvs)
    for saved_cv, uploaded_cv in zip(saved_job.cvs, cvs):
        assert saved_cv.candidate_name is not None
        assert saved_cv.candidate_email is not None
        assert saved_cv.is_recommended is not None
        assert saved_cv.recommendation_points is not None
        assert saved_cv.cv_features is not Nonefrom fastapi.testclient import TestClient
        from cv_checker_backend.controllers.job_controller import upload_job
        from cv_checker_backend.db.db_connector import create_db_and_tables, get_db
        from cv_checker_backend.main import app
        
        # Initialize the database and create tables
        create_db_and_tables()
        
        # Create a TestClient instance
        client = TestClient(app)
        
        def test_upload_job_missing_title_or_description():
            # Define a list of CVs as UploadFile objects
            cvs = [
                {"filename": "cv1.pdf", "file": b"CV content 1"},
                {"filename": "cv2.pdf", "file": b"CV content 2"}
            ]
        
            # Define the request data with missing job title
            data_missing_title = {
                "job_description": "Software Developer",
                "cvs": cvs
            }
        
            # Define the request data with missing job description
            data_missing_description = {
                "job_title": "Senior Software Developer",
                "cvs": cvs
            }
        
            # Send a POST request to the upload_job endpoint with missing job title
            response_missing_title = client.post(
                "/api/v1/add_job",
                files=data_missing_title["cvs"],
                data=data_missing_title
            )
        
            # Send a POST request to the upload_job endpoint with missing job description
            response_missing_description = client.post(
                "/api/v1/add_job",
                files=data_missing_description["cvs"],
                data=data_missing_description
            )
        
            # Assert that the response status code is 422 (Unprocessable Entity)
            assert response_missing_title.status_code == 422
            assert response_missing_description.status_code == 422
        
            # Assert that the error message contains the missing field
            assert "job_title" in response_missing_title.json()["detail"][0]["loc"]
            assert "job_description" in response_missing_description.json()["detail"][0]["loc"]