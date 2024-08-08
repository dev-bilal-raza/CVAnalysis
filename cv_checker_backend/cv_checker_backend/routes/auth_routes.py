from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth, OAuthError  
import httpx

from cv_checker_backend.controllers.user_controller import create_user
from cv_checker_backend.db.db_connector import DB_SESSION
from cv_checker_backend.settings import BACKEND_URL, FRONTEND_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

authRoute = APIRouter()

oauth = OAuth()

# Register Google OAuth
oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid profile email'},
)

# Register GitHub OAuth
oauth.register(
    name='github',
    client_id=GITHUB_CLIENT_ID,
    client_secret=GITHUB_CLIENT_SECRET,
    authorize_url='https://github.com/login/oauth/authorize',
    access_token_url='https://github.com/login/oauth/access_token',
    client_kwargs={'scope': 'user:email'},
)


@authRoute.get("/api/v1/auth/google/login")
async def google_login(request: Request):
    redirect_uri = f'{BACKEND_URL}/api/v1/auth/google/callback'
    return await oauth.google.authorize_redirect(request, redirect_uri)

@authRoute.get("/api/v1/auth/google/callback")
async def google_callback(request: Request, session: DB_SESSION):
    try:
        # Obtain the token response
        token = await oauth.google.authorize_access_token(request)
        print("Token response:", token)
    except OAuthError as error:
        return HTTPException(status_code=400, detail=str(error))
    
    # Extract the ID token from the token response
    user = token.get("userinfo")
    
    # Debugging: Print user details
    if user:
        user_data = {
        "user_id": int(user['sub']),
        "user_name": user['name'],
        "email": user['email'],
        "avatar_url": user['picture'],
        "token": token['id_token']
        }
        print("User details:", user_data)
        response = create_user(user_data, session)
        print("Response while creating user in database: " + response)
        request.session['user'] = dict(user)

    return RedirectResponse(url=FRONTEND_URL)


@authRoute.get("/api/v1/auth/github/login")
async def github_login(request: Request):
    redirect_uri = f'{BACKEND_URL}/api/v1/auth/github/callback'
    return await oauth.github.authorize_redirect(request, redirect_uri)

@authRoute.get("/api/v1/auth/github/callback")
async def github_callback(request: Request):
    try:
        # Obtain the token response
        token = await oauth.github.authorize_access_token(request)
        print("Token response:", token)
        
        # Use the token to fetch user details
        async with httpx.AsyncClient() as client:
            response = await client.get('https://api.github.com/user', headers={'Authorization': f"Bearer {token['access_token']}"})
            user_info = response.json()
            print("User details:", user_info)

        if user_info:
            # Store user information in the session
            request.session['user'] = user_info
            return RedirectResponse(url=FRONTEND_URL)  # Redirect to frontend
        else:
            raise ValueError("No user info found in the response")
    except OAuthError as error:
        raise HTTPException(status_code=400, detail=str(error))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
