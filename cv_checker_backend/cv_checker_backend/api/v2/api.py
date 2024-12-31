from fastapi import APIRouter
from cv_checker_backend.core.settings import API_V2_PREFIX

api_v2_router = APIRouter(prefix=API_V2_PREFIX)