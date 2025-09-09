import os
from fastapi import FastAPI, HTTPException, Depends
from typing import List, Optional
from fastapi.concurrency import asynccontextmanager
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.schemas import Todo as TodoSchema, Todo_Create, Todo_Update, Priority as SchemaPriority
from app.models import Todo as TodoModel, Base, Priority as ModelPriority
from app.database import engine, get_session, SessionLocal

api = FastAPI(title="Todos API", version="1.0.0")




@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- STARTUP ---
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Valfri seed (kör bara om tabellen är tom och SEED=true)
    import os
    if os.getenv("SEED", "").lower() == "true":
        async with SessionLocal() as session:
            res = await session.execute(select(Todo).limit(1))
            if not res.scalars().first():
                session.add_all([
                    Todo(todo_name="Sports",  todo_description="Go to the gym",            todo_priority=ModelPriority.HIGH),
                    Todo(todo_name="Work",    todo_description="Finish the report",        todo_priority=ModelPriority.MEDIUM),
                    Todo(todo_name="Shopping",todo_description="Buy groceries",            todo_priority=ModelPriority.LOW),
                    Todo(todo_name="Study",   todo_description="Read Python docs",         todo_priority=ModelPriority.MEDIUM),
                    Todo(todo_name="Travel",  todo_description="Plan the trip to Japan",   todo_priority=ModelPriority.LOW),
                ])
                await session.commit()

    yield  # ----- här kör appen -----

    # --- SHUTDOWN ---
    await engine.dispose()

api = FastAPI(lifespan=lifespan)

@api.get("/todos/{todo_id}", response_model=TodoSchema)
async def read_todo(todo_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(TodoModel).where(TodoModel.todo_id == todo_id))
    todo = result.scalar_one_or_none()
    if not todo:
        raise HTTPException(status_code=404, detail=f"Error, no entry matched the id {todo_id}")
    return todo
      


@api.get("/todos", response_model=List[TodoSchema])
async def read_todos(first_n: Optional[int] = None, session: AsyncSession = Depends(get_session)):
    stmt = select(TodoModel).order_by(TodoModel.todo_id.asc())
    if first_n:
        stmt = stmt.limit(first_n)
    result = await session.execute(stmt)
    return result.scalars().all()
    


@api.post("/todos", response_model=TodoSchema, status_code=201)
async def create_todo(created_todo: Todo_Create, session: AsyncSession = Depends(get_session)):
    todo = TodoModel(
        todo_name=created_todo.todo_name,
        todo_description=created_todo.todo_description,
        todo_priority=ModelPriority(created_todo.todo_priority.value),  # Pydantic -> ORM enum
    )
    session.add(todo)
    await session.commit()
    await session.refresh(todo)
    return todo



@api.put("/todos/{todo_id}", response_model=TodoSchema)
async def update_todo(todo_id: int, updated_todo: Todo_Update, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(TodoModel).where(TodoModel.todo_id == todo_id))
    todo = result.scalar_one_or_none()
    if not todo:
        raise HTTPException(status_code=404, detail=f"Error, no entry matched the id {todo_id}")

    if updated_todo.todo_name is not None:
        todo.todo_name = updated_todo.todo_name
    if updated_todo.todo_description is not None:
        todo.todo_description = updated_todo.todo_description
    if updated_todo.todo_priority is not None:
        todo.todo_priority = ModelPriority(updated_todo.todo_priority.value)

    await session.commit()
    await session.refresh(todo)
    return todo



@api.delete("/todos/{todo_id}", response_model=TodoSchema)
async def delete_todo(todo_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(TodoModel).where(TodoModel.todo_id == todo_id))
    todo = result.scalar_one_or_none()
    if not todo:
        raise HTTPException(status_code=404, detail=f"Error, no entry matched the id {todo_id}")
    await session.delete(todo)
    await session.commit()
    return todo