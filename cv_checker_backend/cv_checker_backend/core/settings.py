from typing import Sequence
from starlette.config import Config
from starlette.datastructures import CommaSeparatedStrings
try: 
    config = Config(".env")
except FileNotFoundError as fne:
    print(f"ENV file not found: {fne}")
    
# Database Configuration
DATABASE_URL = config("DATABASE_URL")

# App Configuration
BACKEND_URL = config.get("BACKEND_URL")
FRONTEND_URL = config.get("FRONTEND_URL")
ALLOWED_HOSTS: Sequence[str] = CommaSeparatedStrings(
    config.get("ALLOWED_HOSTS", default="*"))
DEBUG = config.get("DEBUG", cast=bool, default=False)
API_V1_PREFIX = config.get("API_V1_PREFIX", default="/api/v1")
API_V2_PREFIX = config.get("API_V2_PREFIX", default="/api/v2")

# Third-Party Auth Configuration
GOOGLE_CLIENT_ID = config.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = config.get("GOOGLE_CLIENT_SECRET")
GITHUB_CLIENT_ID = config.get("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = config.get("GITHUB_CLIENT_SECRET")

# OpenAI Configuration
OPENAI_KEY = config.get("OPENAI_KEY")

# JWT and Token Configuration
ALGORITHM = config.get("ALGORITHM")
SECRET_KEY = config.get("SECRET_KEY")
ACCESS_TOKEN_KEY = config.get("ACCESS_TOKEN_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES = int(config.get("ACCESS_TOKEN_EXPIRE_MINUTES"))