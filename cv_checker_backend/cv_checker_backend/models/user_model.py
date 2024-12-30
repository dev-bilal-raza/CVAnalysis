from typing import Optional
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    user_id: Optional[int] = Field(primary_key=True)
    user_name: str
    email: str
    avatar_url: str
    is_active: bool = False
    token: str