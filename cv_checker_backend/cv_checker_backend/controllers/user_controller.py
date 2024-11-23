from fastapi import Depends, HTTPException
from cv_checker_backend.models.user_model import User
from cv_checker_backend.db.db_connector import DB_SESSION
from fastapi.security import OAuth2PasswordBearer
from fastapi import Request, HTTPException
from authlib.integrations.starlette_client import OAuth # type: ignore
from sqlmodel import select
from cv_checker_backend.common import STATUS

authSchema = OAuth2PasswordBearer(tokenUrl="/token")
oauth = OAuth()

def create_user(user_data: dict, session: DB_SESSION):
    try:  
        print("User Data: ", user_data)
        if not (user_data.get("email") and user_data.get("user_name") and user_data.get("token")):
            return {"status": STATUS["BAD_REQUEST"], "message": "Please provide valid user data."}
        user_exist = session.exec(select(User).where(User.email == user_data["email"])).one_or_none()
        if user_exist:
            user_exist.email = user_data["email"]
            user_exist.user_name = user_data["user_name"]
            user_exist.is_active = user_data["is_active"]
            user_exist.avatar_url = user_data["avatar_url"]
            user_exist.token = user_data["token"]
            session.add(user_exist)
        else:
            user = User(**user_data)
            session.merge(user)
        session.commit()
        return {"status": STATUS["SUCCESS"], "message": "User has been successfully created."}
    except Exception as e:
        print("ExceptionError: ", e)
        return {"status": STATUS["INTERNAL_SERVER_ERROR"], "message": "Something went wrong."}        

def get_user_from_session(request: Request, session: DB_SESSION):
    try:
        user_data = request.session.get("user")
        print(user_data)
        if not user_data:
            return {"status": STATUS["NOT_AUTHORIZED"], "message": "You are not authorized user"}
        user_email = user_data.get("email") 
        user_in_db = session.exec(select(User).where(User.email == user_email)).one_or_none()
        if not (user_in_db and user_in_db.is_active):
            return {"status": STATUS["NOT_AUTHORIZED"], "message": "You are not authorized user"}
            
        return {"status": STATUS["SUCCESS"], **user_in_db.model_dump()}
    except Exception as e:
        print("ExceptionError: ", e)
        return {"status": STATUS["INTERNAL_SERVER_ERROR"], "message": "Something went wrong. Please refresh the page and try again."}        
        
