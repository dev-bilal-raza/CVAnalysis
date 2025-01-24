from typing import Annotated
from fastapi import APIRouter, Depends
from cv_checker_backend.middlewares.auth_middleware import authenticate_user
from cv_checker_backend.controllers.user_controller import get_user_by_email, get_user_details, update_user

userRoute = APIRouter()

# Adding dependency on authenticate_user middleware to authenticate user before accessing routes in userRoute.
userRoute.dependencies = [Depends(authenticate_user)]

@userRoute.get("/get_user_details")
def getUserDetails(user_details: Annotated[dict, Depends(get_user_details)]):
    return user_details


@userRoute.get("/get_user_by_email")
def getUserByEmail(email: Annotated[str, Depends(get_user_by_email)]):
    return {"email": email}

@userRoute.put("/update_user")
def updateUserDetails(user_data: Annotated[dict, Depends(update_user)]):
    return user_data