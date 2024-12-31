from typing import Annotated
from fastapi import APIRouter, Request, Depends
from cv_checker_backend.core.settings import BACKEND_URL
from cv_checker_backend.config.oauth_config import oauth
from cv_checker_backend.controllers.auth_controller import connect_with_google, connect_with_github

authRoute = APIRouter()

BACKEND_V1_URL = f"{BACKEND_URL}/api/v1"

@authRoute.get("/google/login")
async def google_login(request: Request):
    redirect_uri = f"{BACKEND_V1_URL}/auth/google/callback"
    return await oauth.google.authorize_redirect(request, redirect_uri)
from fastapi import Response

@authRoute.get("/google/callback")
async def google_callback(response: Annotated[Response, Depends(connect_with_google)]):
    return response

@authRoute.get("/github/login")
async def github_login(request: Request):
    redirect_uri = f"{BACKEND_V1_URL}/auth/github/callback"
    return await oauth.github.authorize_redirect(request, redirect_uri)

@authRoute.get("/github/callback")
async def github_callback(response: Annotated[Response, Depends(connect_with_github)]):
    return response
