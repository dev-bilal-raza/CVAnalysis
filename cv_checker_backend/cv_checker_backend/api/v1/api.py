from fastapi import APIRouter
from cv_checker_backend.core.settings import API_V1_PREFIX
from cv_checker_backend.api.v1.routes.auth_routes import authRoute
from cv_checker_backend.api.v1.routes.user_routes import userRoute
from cv_checker_backend.api.v1.routes.job_routes import jobRoute

api_v1_router = APIRouter(prefix=API_V1_PREFIX)

api_v1_router.include_router(router=authRoute, prefix="/auth", tags=["Authentication"])
api_v1_router.include_router(router=userRoute, prefix="/users", tags=["User Management"])
api_v1_router.include_router(router=jobRoute, prefix="/jobs", tags=["Job Management"])