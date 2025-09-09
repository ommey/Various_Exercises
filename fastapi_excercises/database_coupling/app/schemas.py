from enum import IntEnum
from pydantic import BaseModel, Field
from typing import Optional

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
    