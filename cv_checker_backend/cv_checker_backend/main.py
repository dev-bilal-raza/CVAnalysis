import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware 
from cv_checker_backend.api.v1.api import api_v1_router
from cv_checker_backend.db.db_connector import connect_to_db
from cv_checker_backend.core.settings import SECRET_KEY, ALLOWED_HOSTS

def lifespan(app: FastAPI):
    print("Connecting from database....")
    connect_to_db()
    yield

# App Metadata
APP_VERSION = "1.0.0"

# Initialize FastAPI app with configuration
app = FastAPI(
    title="CV Analysis API",
    description="A comprehensive API for analyzing and managing CVs, including user authentication, user management, and job management functionalities.",
    version=APP_VERSION,
    lifespan=lifespan,
    openapi_tags=[
        {
            "name": "Authentication",
            "description": "Operations related to user authentication"
        },
        {
            "name": "User Management",
            "description": "Operations related to user management"
        },
        {
            "name": "Job Management",
            "description": "Operations related to job management"
        }
    ]
)

if not ALLOWED_HOSTS:
    ALLOWED_HOSTS = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_HOSTS,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

@app.get("/")
async def home():
    return {"message": "Welcome to the CV Checker Project"}

app.include_router(api_v1_router)

def start():
    uvicorn.run("cv_checker_backend.main:app", host="0.0.0.0", port=8000, reload=True)