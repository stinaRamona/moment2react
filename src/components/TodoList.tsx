//För inhämtning och utskrivning av todos 

import { useState } from "react";
import { useEffect } from "react"; 

//inteface över svaret från webbtjänsten 

interface Todo {
    _id: number,
    todo_title: String, 
    todo_description: String, 
    todo_priority: Number, 
    todo_status: String
}; 


function TodoList() {
    //State för Todo
    const [todos, setTodo] = useState<Todo [] | []>([]); 

    //useEffect 
    useEffect(() => {
        getTodos(); 
    }, []); 

    //funktion för att hämta in todos 
    const getTodos = async () => {
        try {
            const response = await fetch("https://hapitodos.onrender.com/todo"); 

            const data = await response.json(); 

            setTodo(data); 

        } catch(error) {
            console.log(error); 
        }
    }


    return(
        <>
        {
            todos.map((todo) => (
                <div className="todo-div" key={todo._id}>
                    <h1>{ todo.todo_title }</h1> 
                    <p>{ todo.todo_description }</p>
                    <p>{ todo.todo_status}</p>
                </div>
            ))
        }
        </>
    )
}

export default TodoList; 
