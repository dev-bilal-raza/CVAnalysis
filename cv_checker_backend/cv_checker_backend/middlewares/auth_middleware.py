# Absolute imports
from typing import Annotated
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
# Relative imports
from cv_checker_backend.core.common import STATUS
from cv_checker_backend.core.security import validate_user
from cv_checker_backend.db.db_connector import DB_SESSION

oauth_schema = OAuth2PasswordBearer(tokenUrl="/")

def authenticate_user(request: Request, token: Annotated[str, Depends(oauth_schema)], session: DB_SESSION):
    try:
        print(f"Token: {token}")
        if not len(token) > 0:
            print("token not found")
            request.state.user = None
            # raise HTTPException(status_code=401, detail="You are not authorized user. Please login to continue.")
            # return {
            #     "status": STATUS["NOT_AUTHORIZED"],
            #     "message": "You are not authorized user. Please login to continue."
            # }
        response = validate_user(token, session)
        if response["status"] is not STATUS["SUCCESS"]:
            request.state.user = None
            # raise HTTPException(status_code=401, detail="Access denied. Please login to continue.")
            # return response
        request.state.user = response["user"]
    except Exception as e:
        print("Error while authenticating user from token: ", e)
        request.state.user = None
        # raise HTTPException(status_code=401, detail="Access denied. Please login to continue.")
        # return {
        #     "status": STATUS["NOT_AUTHORIZED"],
        #     "message": "Access denied. Please login to continue."
        # }

AUTHENTICATE_USER = Annotated[dict, Depends(authenticate_user)]