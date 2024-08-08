from typing import Annotated
from fastapi import Depends, HTTPException
from cv_checker_backend.models.user_model import User
from cv_checker_backend.db.db_connector import DB_SESSION
from fastapi.security import OAuth2PasswordBearer
from fastapi import Request, HTTPException
from jose import JOSEError
from authlib.integrations.starlette_client import OAuth

authSchema = OAuth2PasswordBearer(tokenUrl="/token")
oauth = OAuth()

def create_user(user_data: dict, session: DB_SESSION):
    try:        
        print(user_data)
        user = User(**user_data)
        session.merge(user)
        session.commit()
        return "User has been successfully created."
    except Exception as e:
        print("ExceptionError: ", e)
        raise HTTPException(status_code=500, detail=str(e))
    
    
def get_user_from_session(request: Request):
    session_token = request.cookies.get("session")
    if not session_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    print("Token: ", session_token)
    
    try:
        # Verify and decode the ID token
        claims = oauth.google.parse_id_token(session_token)
        
        # Extract user information from the claims
        user_id = claims.get('sub')
        if not user_id:
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        return {"user_id": user_id, "email": claims.get('email'), "name": claims.get('name')}
    except JOSEError as e:
        # Invalid token
        print(f"Error decoding token: {e}")
        raise HTTPException(status_code=401, detail="Unauthorized")
