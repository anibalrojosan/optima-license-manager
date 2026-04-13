from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import create_engine
from sqlmodel import SQLModel

from alembic import context
from app.core.db import SQLALCHEMY_DATABASE_URI

# noqa: F401 — register models on SQLModel metadata
from app.models.auth import Organization, User  

# Alembic Config object
config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

config.set_main_option("sqlalchemy.url", SQLALCHEMY_DATABASE_URI)

target_metadata = SQLModel.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    context.configure(
        url=SQLALCHEMY_DATABASE_URI,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = create_engine(SQLALCHEMY_DATABASE_URI, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
