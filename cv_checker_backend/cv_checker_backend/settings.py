from starlette.config import Config

try: 
    config = Config(".env")
except FileNotFoundError as fne:
    print(f"ENV file not found: {fne}")
    

DATABASE_URL = config("DATABASE_URL")

GOOGLE_CLIENT_ID = config.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = config.get("GOOGLE_CLIENT_SECRET")
GITHUB_CLIENT_ID = config.get("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = config.get("GITHUB_CLIENT_SECRET")
BACKEND_URL = config.get("BACKEND_URL")
FRONTEND_URL = config.get("FRONTEND_URL")
OPENAI_KEY = config.get("OPENAI_KEY")
SECRET_KEY = config.get("SECRET_KEY")
ALGORITHM = config.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = config.get("ACCESS_TOKEN_EXPIRE_MINUTES")