from fastapi import FastAPI, HTTPException
from typing import List, Optional

from enum import IntEnum
from pydantic import BaseModel, Field

api = FastAPI()

class Priority(IntEnum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3

# Base model for a todo, used for creating and updating todos
# all fields are required
class Todo_Base(BaseModel):
    todo_name : str = Field(..., min_length=1, max_length=32, description="The name of the todo")
    todo_priority : Priority = Field(default=Priority.LOW ,description="The priority of the todo")
    todo_description : str = Field(..., max_length=256, description="The description of the todo")

# inherits from Todo_Base 
# used when creating a new todo
# när användaren skapar en todo behöver den inte skicka med id!!!
class Todo_Create(Todo_Base):
    pass

# inherits from Todo_Base and adds an id field
# used when returning a todo to the user
# typically returning updated todos
class Todo(Todo_Base):
    todo_id: int = Field(..., description="The ID of the todo")

# Used when updating a todo, all fields are optional
# so the user can update only the fields they want
class Todo_Update(BaseModel):
    todo_name : Optional[str] = Field(None, min_length=1, max_length=32, description="The name of the todo")
    todo_priority : Optional[Priority] = Field(None ,description="The priority of the todo")
    todo_description : Optional[str] = Field(None, max_length=256, description="The description of the todo")
    
# 

# pseudo database
all_todos = [
    Todo(todo_id=1, todo_name='Sports', todo_description='Go to the gym' , todo_priority=Priority.HIGH),
    Todo(todo_id=2, todo_name='Work', todo_description='Finish the report', todo_priority=Priority.MEDIUM),
    Todo(todo_id=3, todo_name='Shopping', todo_description='Buy groceries' , todo_priority=Priority.LOW),
    Todo(todo_id=4, todo_name='Study', todo_description='Read Python documentation' , todo_priority=Priority.MEDIUM),
    Todo(todo_id=5, todo_name='Travel', todo_description='Plan the trip to Japan' , todo_priority=Priority.LOW),
    Todo(todo_id=6, todo_name='Sports', todo_description='Go to the gym' , todo_priority=Priority.HIGH),
   ]


# localhost:pppp/todos/n anropar api.get("/todos/{todo_id}")
# medans localhost:pppp/todos anropar api.get("/todos")
# localhost:pppp/todos?first_n anropar api.get("/todos") med query parameter

#app.get("/todos") hämtar todo
@api.get("/todos/{todo_id}", response_model=Todo)
def read_todo(todo_id: int):
    for todo in all_todos:
        if todo.todo_id == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Error, no entry matched the id " + str(todo_id))
        
#app.get() hämtar alla todos eller de första n todos
@api.get("/todos", response_model=List[Todo])
def read_todos(first_n: Optional[int] = None):
    if first_n:
        return all_todos[:first_n]
    return all_todos
    

@api.post("/todos" , response_model=Todo)
def create_todo(created_todo: Todo_Create):
    new_todo_id = (max((t.todo_id for t in all_todos), default=0)) + 1
    new_todo = Todo(
    todo_id=new_todo_id,
    todo_name=created_todo.todo_name,
    todo_description=created_todo.todo_description,
    todo_priority=created_todo.todo_priority,
    )
    
    all_todos.append(new_todo)
    return new_todo

@api.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, updated_todo: Todo_Update):
    for original_todo in all_todos:
        if original_todo.todo_id == todo_id:
            if updated_todo.todo_name != None:
                original_todo.todo_name = updated_todo.todo_name
            if updated_todo.todo_description != None:
                original_todo.todo_description = updated_todo.todo_description
            if updated_todo.todo_priority != None:
                original_todo.todo_priority = updated_todo.todo_priority
            return original_todo
    raise HTTPException(status_code=404, detail=f"Error, no entry matched the id {todo_id}")


@api.delete("/todos/{todo_id}", response_model=Todo)
def delete_todo(todo_id: int):
    for index, todo in enumerate(all_todos):
        if todo.todo_id == todo_id:
            return all_todos.pop(index)
    raise HTTPException(status_code=404, detail=f"Error, no entry matched the id {todo_id}")
