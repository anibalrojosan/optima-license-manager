"""
Authentication services.
Contains the business logic for the authentication endpoints.
"""

from fastapi import HTTPException, status
from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models.auth import Organization, User
from app.schemas.auth import UserRegisterRequest


def authenticate_user(session: Session, email: str, password: str) -> User:
    """
    Verifies user credentials against the database.
    Returns the user object if valid, raises HTTPException otherwise.
    """
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
        
    if not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
        
    return user


def register_new_user(session: Session, user_in: UserRegisterRequest) -> tuple[User, Organization]:
    """
    Creates a new organization and an admin user linked to it.
    Uses a transaction to ensure both are created together.
    """
    # Check if user already exists
    statement = select(User).where(User.email == user_in.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    try:
        # 1. Create Organization
        org = Organization(name=user_in.organization_name)
        session.add(org) # add the organization to the SQLModel session but don't commit it yet
        session.flush()  # get the org.id without committing the transaction yet

        # 2. Create User
        user = User(
            email=user_in.email,
            password_hash=get_password_hash(user_in.password),
            organization_id=org.id,
            role="admin"  # First user of an org is always admin
        )
        session.add(user)
        
        # 3. Commit both
        session.commit()
        session.refresh(user)
        session.refresh(org)
        
        return user, org
        
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user and organization: {str(e)}"
        ) from e
