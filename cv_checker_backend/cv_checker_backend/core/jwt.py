from jose import jwt, JWTError
from  typing import Dict, Optional
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta, datetime, timezone
from cv_checker_backend.core.common import STATUS
from cv_checker_backend.core.settings import ALGORITHM, SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES

def generate_token(data: Dict, expire_time: Optional[timedelta] = None):
    try:
        to_enode = data.copy()
        if expire_time:
            # Set the expiration time if provided
            expire = datetime.now(timezone.utc) + expire_time
        else:
            # Default expiration time
            expire = datetime.now(timezone.utc) + \
                timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_enode.update({"exp": expire})
        ecoded_token = jwt.encode(to_enode, SECRET_KEY, algorithm=ALGORITHM)
        return {
            "status": STATUS["SUCCESS"],
            "access_token": str(ecoded_token)
        }
    except JWTError as e:
        print("Error while encoding the Data: ", e)
        return {
            "status": STATUS["INTERNAL_SERVER_ERROR"],
            "message": "Something went wrong while encoding the Data."
        }


def decode_token(token: str):
    """
    Decodes a JWT token to retrieve the payload data.
    Args:
        token (str): The JWT token to decode.
    Returns:
        dict: The decoded payload data.
    """
    try:
        # Decode the token to retrieve the payload data
        decoded_data = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM, options={"verify_exp": True})
        return {
            "status": STATUS["SUCCESS"],
            "data": decoded_data
        }
    except JWTError as je:
        # Raise an exception if there's an error decoding the token
        print("Error occured while decoding token: ", je)
        return {
            "status": STATUS["NOT_AUTHORIZED"],
            "message": "Token is not valid"
        }