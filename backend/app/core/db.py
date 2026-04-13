"""
Database configuration and utilities.
"""
import os
from collections.abc import Generator

from dotenv import load_dotenv
from sqlmodel import Session, create_engine

load_dotenv()


def _resolve_database_url() -> str:
    """Prefer DATABASE_URL; otherwise build from POSTGRES_* (local/dev fallback)."""
    explicit = os.getenv("DATABASE_URL")
    if explicit:
        return explicit

    user = os.getenv("POSTGRES_USER", "postgres")
    password = os.getenv("POSTGRES_PASSWORD", "postgres")
    server = os.getenv("POSTGRES_SERVER", "localhost")
    port = os.getenv("POSTGRES_PORT", "5436")
    db = os.getenv("POSTGRES_DB", "optima_db")
    return f"postgresql://{user}:{password}@{server}:{port}/{db}"


SQLALCHEMY_DATABASE_URI = _resolve_database_url()

# Create the database engine
engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=False)


def get_session() -> Generator[Session, None, None]:
    """
    Dependency function to yield a database session.
    It ensures the session is closed after the request is completed.
    """
    with Session(engine) as session:
        yield session
