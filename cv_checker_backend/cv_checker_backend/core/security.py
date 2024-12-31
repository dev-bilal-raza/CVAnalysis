from cv_checker_backend.core.settings import ACCESS_TOKEN_KEY, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi.responses import RedirectResponse

def set_token_in_cookie(response: RedirectResponse, token: str):
    response.set_cookie(
        key=ACCESS_TOKEN_KEY,
        value=token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    return response