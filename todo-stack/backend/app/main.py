from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from sqlmodel import select, Session
from .database import init_db, get_session
from .models import Task, TaskCreate, TaskRead, TaskUpdate


app = FastAPI(title="Todo API", openapi_url="/api/openapi.json", docs_url="/api/docs")


# CORS: allow local dev + nginx origin
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost").split(",")
app.add_middleware(
CORSMiddleware,
allow_origins=origins,
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


# Health
@app.get("/api/health")
def health():
    return {"status": "ok"}


# CRUD
@app.get("/api/tasks", response_model=list[TaskRead])
def list_tasks(session: Session = Depends(get_session)):
    tasks = session.exec(select(Task).order_by(Task.created_at.desc())).all()
    return tasks


@app.post("/api/tasks", response_model=TaskRead, status_code=201)
def create_task(payload: TaskCreate, session: Session = Depends(get_session)):
    task = Task(**payload.dict())
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@app.get("/api/tasks/{task_id}", response_model=TaskRead)
def get_task(task_id: int, session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        return task


@app.put("/api/tasks/{task_id}", response_model=TaskRead)
def update_task(task_id: int, payload: TaskUpdate, session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")


    update_data = payload.dict(exclude_unset=True)
    for k, v in update_data.items():
        setattr(task, k, v)
    from datetime import datetime
    task.updated_at = datetime.utcnow()
    
    session.add(task)
    session.commit()
    session.refresh(task)
    
    return task


@app.patch("/api/tasks/{task_id}/finish", response_model=TaskRead)
def finish_task(task_id: int, session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.is_done = True
    from datetime import datetime
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@app.delete("/api/tasks/{task_id}", status_code=204)
def delete_task(task_id: int, session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        session.delete(task)
        session.commit()
        return None