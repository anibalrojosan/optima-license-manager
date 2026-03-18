import os
from datetime import UTC, datetime, timedelta
from typing import Any

from dotenv import load_dotenv
from jose import jwt
from passlib.context import CryptContext

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# Hashing configuration (bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies if a plain password matches the stored hash.

    Args:
        plain_password (str): The plain password to verify.
        hashed_password (str): The stored hash to compare against.

    Returns:
        bool: True if the password matches the hash, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Generates a secure hash (bcrypt) from a plain password.

    Args:
        password (str): The plain password to hash.

    Returns:
        str: A secure hash (bcrypt) of the password.
    """
    return pwd_context.hash(password)


def create_access_token(subject: str | Any, time_to_expire: timedelta = None) -> str:
    """
    Generates a signed JWT token for a subject 'sub'.

    Args:
        subject (str | Any): The subject of the token (usually the user ID).
        time_to_expire (timedelta, optional): The time to expire the token. If not provided,
            the token will expire in ACCESS_TOKEN_EXPIRE_MINUTES minutes.

    Returns:
        str: A signed JWT token.
    """
    if time_to_expire:
        expire = datetime.now(UTC) + time_to_expire
    else:
        expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Payload contains the subject ('sub') and the expiration time ('exp')
    to_encode = {"exp": expire, "sub": str(subject)}
    
    # Sign the token using the SECRET_KEY and the specified algorithm
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt
