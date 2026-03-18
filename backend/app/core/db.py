"""
Database configuration and utilities.
"""
import os
from collections.abc import Generator

from dotenv import load_dotenv
from sqlmodel import Session, create_engine

load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
POSTGRES_SERVER = os.getenv("POSTGRES_SERVER", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5436")
POSTGRES_DB = os.getenv("POSTGRES_DB", "optima_db")

SQLALCHEMY_DATABASE_URI = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

# Create the database engine
engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=False)

def get_session() -> Generator[Session, None, None]:
    """
    Dependency function to yield a database session.
    It ensures the session is closed after the request is completed.
    """
    with Session(engine) as session:
        yield session
