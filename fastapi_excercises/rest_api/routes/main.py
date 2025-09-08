from fastapi import FastAPI

api = FastAPI()

# pseudo database
all_todos = [
    {'todo_id' : 1, 'todo_name': 'Sports', 'todo_description': 'Go to the gym'},
    {'todo_id' : 2, 'todo_name': 'Work', 'todo_description': 'Finish the report'},
    {'todo_id' : 3, 'todo_name': 'Shopping', 'todo_description': 'Buy groceries'},
    {'todo_id' : 4, 'todo_name': 'Study', 'todo_description': 'Read Python documentation'},
    {'todo_id' : 5, 'todo_name': 'Travel', 'todo_description': 'Plan the trip to Japan'},
]

#GET hämtar data
@api.get("/")
def read_root():
    return {"Hello": "World"}

# localhost:pppp/todos/n anropar api.get("/todos/{todo_id}")
# medans localhost:pppp/todos anropar api.get("/todos")
# localhost:pppp/todos?first_n anropar api.get("/todos") med query parameter

#app.get("/todos") hämtar todo
@api.get("/todos/{todo_id}")
def read_todo(todo_id: int):
    for todo in all_todos:
        if todo['todo_id'] == todo_id:
            return {'resilt': todo}
        
#app.get() hämtar alla todos
@api.get("/todos")
def read_todos(first_n: int = None):
    if first_n:
        return {'result': all_todos[:first_n]}
    else:
        return {'result': all_todos}
    

    