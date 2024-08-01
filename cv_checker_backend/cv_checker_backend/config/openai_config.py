from openai import OpenAI
from cv_checker_backend.settings import OPENAI_KEY

client = OpenAI(
    api_key=OPENAI_KEY
)
