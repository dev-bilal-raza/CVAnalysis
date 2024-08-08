import cloudinary  # type:ignore
from cv_checker_backend.settings import CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET


cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=CLOUD_KEY,
    api_secret=CLOUD_SECRET
)