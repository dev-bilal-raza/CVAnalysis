import uvicorn
from cv_checker_backend.main import app

def start():
    uvicorn.run("my_server:app", host="0.0.0.0", port=8000, reload=True)
    ...