import httpx
from fastapi import Request
from fastapi.responses import RedirectResponse
from cv_checker_backend.config.oauth_config import oauth
from cv_checker_backend.core.settings import FRONTEND_URL
from authlib.integrations.starlette_client import OAuthError
from cv_checker_backend.db.db_connector import DB_SESSION
from cv_checker_backend.controllers.user_controller import create_user
from cv_checker_backend.core.security import set_token_in_cookie

async def connect_with_google(request: Request, session: DB_SESSION):
    try:
        # Obtain the token response
        token = await oauth.google.authorize_access_token(request)
        print("Token response:", token)
    except OAuthError as error:
        # Handle the case where the user cancels or denies access
        error_detail = "You canceled the authentication process. Please try again." if str(error).startswith("access_denied") else "Something went wrong during the authentication process. Please try again."
        print("OAuthError:", error_detail)
        
        # Redirect the user to a friendly error page or login page
        return RedirectResponse(url=f"{FRONTEND_URL}/register?error={error_detail}")
    
    # Extract the ID token from the token response
    user = token.get("userinfo")
    
    if user:
        if not user.get("email") or not user.get("name"):
            return RedirectResponse(url=f"{FRONTEND_URL}/register?error=Details could not find from your google account.")
        user_data = {
            "user_name": user["name"].strip(),
            "email": user["email"].lower().strip(),
            "avatar_url": user.get("picture", ""),
            "is_active": True
        }
        print("User details:", user_data)
        response = create_user(user_data, session)
        
        # Set the ID token in a secure cookie
        response = RedirectResponse(url=FRONTEND_URL)
        response = set_token_in_cookie(response, user_data)
        if not isinstance(response,  RedirectResponse):
            return RedirectResponse(url=f"{FRONTEND_URL}/register?error={response["message"]}")
        return response
    
    # Handle the case where user details are missing
    return RedirectResponse(url=f"{FRONTEND_URL}/register?error=Details could not find from your google account.")


async def connect_with_github(request: Request, session: DB_SESSION):
    try:
        # Obtain the token response
        token = await oauth.github.authorize_access_token(request)
        print("Token response:", token)
        # Use the token to fetch user details
        async with httpx.AsyncClient() as client:
            # Fetch basic user details
            response = await client.get("https://api.github.com/user", headers={"Authorization": f"Bearer {token["access_token"]}"})
            user_info = response.json()
            print("User details:", user_info)

            # Fetch email separately if it"s not included in the user info
            if not user_info.get("email"):
                email_response = await client.get("https://api.github.com/user/emails", headers={"Authorization": f"Bearer {token["access_token"]}"})
                emails = email_response.json()
                print("Email Reponse: ", emails)
                # Find the primary email
                primary_email = next((email["email"] for email in emails if email["primary"]), None)
                user_info["email"] = primary_email

        if user_info:
            # Now you can store user information in your database
            user_data = {
                "user_name": user_info.get("login"),
                "avatar_url": user_info.get("avatar_url"),
                "email": user_info.get("email") , # Include email now
                "token": token["access_token"],
                "is_active": True
            }
            # save user to your database            
            user_response = create_user(user_data, session)
            print(f"Response while creating user in database: {user_response}")

            # Store user information in the session
            response = RedirectResponse(url=FRONTEND_URL)  # Redirect to frontend
            set_token_in_cookie(response, token["access_token"])
            return response
        else:
            return RedirectResponse(url=f"{FRONTEND_URL}/register?error=Details could not find from your Github account.")
    
    except OAuthError as error:
        print(f"OAuthError: {error}")
        error_detail  = ""
        return RedirectResponse(url=f"{FRONTEND_URL}/register?error={error_detail}")
    
    except Exception as e:
        print(f"Error: {e}")
        return RedirectResponse(url=f"{FRONTEND_URL}/register?error=An error occurred during the authentication process. Please refresh and try again.")


def signup():
    ...

def login():
    ...