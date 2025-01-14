from typing import Dict
from fastapi.responses import RedirectResponse
from cv_checker_backend.core.common import STATUS
from cv_checker_backend.core.jwt import generate_token, decode_token
from cv_checker_backend.controllers.user_controller import get_user_by_email
from cv_checker_backend.core.settings import ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXPIRE_MINUTES
from cv_checker_backend.db.db_connector import DB_SESSION

async def set_token_in_cookie(response: RedirectResponse, userinfo: Dict):
    try:
        token_res = generate_token(userinfo)
        if token_res["status"] != STATUS["SUCCESS"]:
            return token_res
        response.set_cookie(
            key=ACCESS_TOKEN_KEY,
            value=token_res["access_token"],
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )
        return response
    except Exception as e:
        print(f"Error occured while creating or adding access token in cookie:  {e}")
        return {
            "status": STATUS["ERROR"], 
            "message": "Something went wrong while getting creating access token. Please refresh the page and try again."}

def validate_user(token: str, session: DB_SESSION):
    try:
        print("\nToken is: ", token, "\n")
        decoded_data = decode_token(token)
        if decoded_data["status"] != STATUS["SUCCESS"]:
            return decoded_data
        userinfo = decoded_data["data"]
        user_details = get_user_by_email(userinfo["email"], session)
        print(user_details)
        if user_details["status"] != STATUS["SUCCESS"]:
            return user_details
        elif not (user_details["user"] and user_details["user"].is_active):
            return {
                "status": STATUS["NOT_AUTHORIZED"],
                "message": "Your account is not active. Please Login to continue."
            }
        return {
            "status": STATUS["SUCCESS"],
            "user": user_details["user"]
        }
    except Exception as e:
        print(f"Error occured while validating user: {e}")
        return {
            "status": STATUS["ERROR"],
            "message": "Something went wrong while validating user. Please refresh the page and try again."
        }