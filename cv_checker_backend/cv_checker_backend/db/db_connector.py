from cv_checker_backend.core.settings import DATABASE_URL
from sqlmodel import create_engine, SQLModel, Session
from fastapi import Depends, HTTPException
from typing import Annotated

# create a connection to the database
connection_string = str(DATABASE_URL).replace(
    "postgresql", "postgresql+psycopg"
)

# create an engine to connect to the database
engine = create_engine(
    connection_string,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    pool_recycle=300
)

# create a session to interact with the database
def get_session():
    with Session(engine) as session:
        yield session

# create a dependency to inject the session into the route
DB_SESSION = Annotated[Session, Depends(get_session)]

# create a function to connect to the database
def connect_to_db() -> None:
    try:
        SQLModel.metadata.create_all(engine)
    except Exception as e:
        print(f"Failed to initialize database: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Database initialization failed"
        )
