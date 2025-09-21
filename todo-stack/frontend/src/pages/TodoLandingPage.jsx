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


export function TodoLandingPage() {
    const [toDoList, setToDoList] = useState([]);

    useEffect(() => {
        const getTodoList = async () => {
            const request = await axios.get('/api/todo-list');
            setToDoList(request.length);
            };
        getTodoList();
        console.log(toDoList.length);

    }, [toDoList] );
    return (




        <div className='todo-landing-page'>
            current amount of todos are: {toDoList.length}
            
            Todos will be visible here
        </div>
    );
}

export default TodoLandingPage;