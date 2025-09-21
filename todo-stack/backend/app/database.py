from sqlmodel import SQLModel, create_engine, Session
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo.db")

# echo=True om du vill se SQL
# SQLite flags for concurrency safety (ok for dev/small prod)
engine = create_engine(
DATABASE_URL,
connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)


def init_db():
    SQLModel.metadata.create_all(engine)


# FastAPI deps-style session
def get_session():
    with Session(engine) as session: 
        yield session