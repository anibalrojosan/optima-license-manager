"""
Authentication API endpoints. 
Routes that uses services and dependencies to register and authenticate users and organizations.
"""

from fastapi import APIRouter, status

from app.api.deps import SessionDep
from app.core.security import create_access_token
from app.schemas.auth import AuthResponse, UserLoginRequest, UserRegisterRequest
from app.services.auth import authenticate_user, register_new_user

router = APIRouter()


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(
    request: UserRegisterRequest, 
    session: SessionDep
) -> AuthResponse:
    """
    Register a new organization and its admin user.
    """
    # Create the user and organization via the service
    user, org = register_new_user(session=session, user_in=request)
    
    # Generate the JWT token
    access_token = create_access_token(subject=user.id)
    
    # Return the response matching the API contract
    return AuthResponse(
        access_token=access_token,
        user=user,
        organization=org
    )


@router.post("/login", response_model=AuthResponse, status_code=status.HTTP_200_OK)
def login(
    request: UserLoginRequest, 
    session: SessionDep
) -> AuthResponse:
    """
    Authenticate a user and return a JWT token.
    """
    # Authenticate via the service
    user = authenticate_user(session=session, email=request.email, password=request.password)
    
    # Generate the JWT token
    access_token = create_access_token(subject=user.id)
    
    # Return the response matching the API contract
    return AuthResponse(
        access_token=access_token,
        user=user,
        organization=user.organization
    )
