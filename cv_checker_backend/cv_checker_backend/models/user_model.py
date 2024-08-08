from typing import Optional
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, BigInteger, Column, Numeric
class User(SQLModel, table=True):
    user_id: Optional[int] = Field(sa_column=Column(Numeric, primary_key=True))
    user_name: str
    email: str
    avatar_url: str
    is_active: bool = False
    token: str