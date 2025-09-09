from enum import IntEnum
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy import String, Enum  # OBS: Enum från SQLAlchemy

class Base(AsyncAttrs, DeclarativeBase):
    pass

class Priority(IntEnum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3

class Todo(Base):
    __tablename__ = "todos"

    todo_id: Mapped[int] = mapped_column(primary_key=True)
    todo_name: Mapped[str] = mapped_column(String(32), nullable=False)
    todo_description: Mapped[str] = mapped_column(String(256), nullable=False)
    todo_priority: Mapped[Priority] = mapped_column(
        Enum(Priority), nullable=False, default=Priority.MEDIUM
    )