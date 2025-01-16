from fastapi import Request
from sqlmodel import select
from cv_checker_backend.core.common import STATUS
from cv_checker_backend.db.db_connector import DB_SESSION
from cv_checker_backend.models.user_model import User, UserInUpdate


def create_user(user_data: dict, session: DB_SESSION):
    try:
        print("User Data: ", user_data)
        if not (user_data.get("email") and user_data.get("user_name")):
            return {"status": STATUS["BAD_REQUEST"], "message": "Please provide valid user data."}
        user_exist = session.exec(select(User).where(User.email == user_data["email"])).one_or_none()
        if user_exist:
            user_exist.email = user_data["email"]
            user_exist.user_name = user_data["user_name"]
            user_exist.is_active = user_data["is_active"]
            user_exist.avatar_url = user_data["avatar_url"]
            session.add(user_exist)
        else:
            user = User(**user_data)
            session.merge(user)
        session.commit()
        return {"status": STATUS["SUCCESS"], "message": "User has been successfully created."}
    except Exception as e:
        print("ExceptionError: ", e)
        return {"status": STATUS["INTERNAL_SERVER_ERROR"], "message": "Something went wrong."}        

def get_user_by_id(user_id: int, session: DB_SESSION):
    try:
        user = session.get(User, user_id)
        if not user:
            return {
                "status": STATUS["NOT_FOUND"],
                "message": f"User could not found from id: {user_id}"
            }
        return {
            "status": STATUS["SUCCESS"],
            "user": user
        }
    except Exception as e:
        print(f"Error occured while getting user from id, {e}")
        return {
            "status": STATUS["INTERNAL_SERVER_ERROR"],
            "message": "Something went wrong while retrieving user data. Please refresh the page and try again."
        }

def get_user_by_email(email: str, session: DB_SESSION):
    try:
        user = session.exec(select(User).where(User.email == email)).one_or_none()
        if not user:
            return {
                "status": STATUS["NOT_FOUND"],
                "message": f"User could not found from email: {email}"
            }
        return {
            "status": STATUS["SUCCESS"],
            "user": user
        }
    except Exception as e:
        print(f"Error occured while getting user from email, {e}")
        return {
            "status": STATUS["INTERNAL_SERVER_ERROR"],
            "message": "Something went wrong while retrieving user data from email. Please refresh the page and try again."
        }

def get_user_details(request: Request):
    try:    
        user = request.state.user
        if not user:
            return {
                "status": STATUS["NOT_AUTHORIZED"],
                "message": "You are not authorized user. Please login to continue."
            }
        return {
            "status": STATUS["SUCCESS"],
            "user": user
        }
    except Exception as e:
        print(f"Error while getting user details, {e}")
        return {
            "status": STATUS["INTERNAL_SERVER_ERROR"],
            "message": "Something went wrong while retrieving user details. Please refresh the page and try again."
        }

def update_user(user_details: UserInUpdate, session: DB_SESSION):
    try:
        ...
    except Exception as e:
        print(f"Error while updating user, {e}")
      
