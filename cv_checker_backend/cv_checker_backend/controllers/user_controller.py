from fastapi import HTTPException
from cv_checker_backend.models.user_model import User
from cv_checker_backend.db.db_connector import DB_SESSION

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