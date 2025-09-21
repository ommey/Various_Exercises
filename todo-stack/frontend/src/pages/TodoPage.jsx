import axios from 'axios';
import { useEffect, useState } from 'react';

/**
  useEffect(
    () => {
      const getHomeData = async () => {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      };

      getHomeData();
    },
    [
  *  ]
 * );
**/


export function TodoPage() {

  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    const getTodoList = async () => {
      const request = await axios.get('/api/todos');
      setToDoList(request.length);
    };
    getTodoList();
    console.log(toDoList.length);

  }, [toDoList]);
  return (




    <div className='todo-page'>
      current amount of todos are: {toDoList.length}

      Todos will be visible here
    </div>
  );
}

