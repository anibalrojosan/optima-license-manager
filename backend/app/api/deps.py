"""
Dependencies for the API.
"""

from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlmodel import Session

from app.core.db import get_session
from app.core.security import ALGORITHM, SECRET_KEY
from app.models.auth import User

# This tells FastAPI where the client should send the token request
# We map it to our login endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

TokenDep = Annotated[str, Depends(oauth2_scheme)]
SessionDep = Annotated[Session, Depends(get_session)]

def get_current_user(
    token: TokenDep, 
    session: SessionDep
) -> User:
    """
    Dependency to validate the JWT token and return the current user.
    Use this in any endpoint that requires authentication.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError as e:
        # This catches expired tokens, invalid signatures, etc.
        raise credentials_exception from e
        
    # Fetch the user from the database
    user = session.get(User, int(user_id))
    if user is None:
        raise credentials_exception
        
    return user
