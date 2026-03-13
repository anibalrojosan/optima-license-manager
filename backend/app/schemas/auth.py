from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr


class OrganizationBase(BaseModel):
    name: str


class UserRegisterRequest(UserBase):
    password: str = Field(..., min_length=8)
    organization_name: str = Field(..., min_length=2)


class UserLoginRequest(UserBase):
    password: str


class OrganizationRead(OrganizationBase):
    id: int
    created_at: datetime


class UserRead(UserBase):
    id: int
    organization_id: int
    role: str
    created_at: datetime


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead
    organization: OrganizationRead


class ErrorResponse(BaseModel):
    detail: str
