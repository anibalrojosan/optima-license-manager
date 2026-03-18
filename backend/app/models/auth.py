from datetime import UTC, datetime

from sqlmodel import Field, Relationship, SQLModel


class Organization(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    
    # lambda is used to ensure the funcion it's called everytime a new object is created
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    # Relationships
    users: list["User"] = Relationship(back_populates="organization")


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    organization_id: int = Field(foreign_key="organization.id")
    email: str = Field(unique=True, index=True)
    password_hash: str
    role: str = Field(default="viewer")  # "admin", "viewer"
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    # Relationships
    organization: Organization = Relationship(back_populates="users")
