from typing import List
from pydantic import BaseModel
from sqlmodel import Relationship, SQLModel, Field
from datetime import datetime


class JobBase(SQLModel):
    job_title: str
    job_description: str


class Job(JobBase, table=True):
    job_id: int | None = Field(primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    # created_at: datetime = datetime.now()
    cvs: List["Cv"] = Relationship(back_populates="job", sa_relationship_kwargs={
        "cascade": "all, delete-orphan"
    })


class Cv(SQLModel, table=True):
    cv_id: int = Field(primary_key=True)
    candidate_name: str
    candidate_email: str
    is_recommended: bool
    recommendation_points: int
    job_id: int = Field(foreign_key="job.job_id")
    job: Job | None = Relationship(back_populates="cvs")
    cv_features: "CvFeatures" = Relationship(back_populates="cv")


class CvFeatures(SQLModel, table=True):
    cv_feature_id: int = Field(primary_key=True)
    cv_id: int = Field(foreign_key="cv.cv_id")
    summary: str
    skills: str
    education: str
    experience: str
    cv: Cv | None = Relationship(back_populates="cv_features")


class Reviews(BaseModel):
    user_name: str
    field: str
    review: str
    rating: int
    is_allowed: bool = Field(default=False)
