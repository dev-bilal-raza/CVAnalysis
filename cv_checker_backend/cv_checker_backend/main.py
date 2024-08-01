from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware 
from cv_checker_backend.settings import SECRET_KEY
from cv_checker_backend.db.db_connector import create_db_and_tables
from cv_checker_backend.routes import auth_routes, job_routes
def lifespan(app: FastAPI):
    print("Create database....")
    create_db_and_tables()
    yield


# Initialize FastAPI app with configuration
app = FastAPI(
    title="Firebase Auth API",
    description="An API for Firebase Google Authentication using FastAPI",
    lifespan=lifespan,
    version="1.0.0",
    openapi_url="/api/v1/openapi.json",
    docs_url="/api/v1/docs",
    redoc_url="/api/v1/redoc",
    openapi_tags=[
        {
            "name": "auth",
            "description": "Operations related to authentication"
        }
    ]
)

origins = ["https://cv-analyzer-oa7fkrczha-uc.a.run.app",
           "http://localhost:3000"]

# Uncomment it, if you want to use the default middleware for requesting
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

@app.get("/")
async def home():
    return {"message": "Welcome to the CV Checker Project"}


app.include_router(router=auth_routes.authRoute)
app.include_router(router=job_routes.jobRoute)


# @app.put("/api/v1/update_job_description")
# def update_job_description(update_message: Annotated[str, Depends(update_description)]):
#     return update_message