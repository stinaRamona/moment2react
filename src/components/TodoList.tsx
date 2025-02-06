//För inhämtning och utskrivning av todos 

import { useState } from "react";
import { useEffect } from "react"; 

//inteface över svaret från webbtjänsten 

interface Todo {
    _id: number,
    todo_title: string, 
    todo_description: string, 
    todo_priority: number, 
    todo_status: string
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

    //Funktion för att ta bort todo
    const deleteTodo = async (id: any) => {
        try {
            const response = await fetch("https://hapitodos.onrender.com/todo/" + id, {
                method: "DELETE", 
                headers: {
                    'Content-Type': 'application/json',
                },
            }); 

            if(!response.ok) {
                throw new Error("Kunde inte ta bort todo")
            }

            getTodos(); 

        } catch(error) {
            console.log(error); 
        }
    }

    //funktion för att uppdatera todo 
    const updateTodoStatus = async (e : any, todo : Todo) => {
        let updatedStatus = e.target.value; 

        const updatedTodo = {
            todo_title: todo.todo_title, 
            todo_description: todo.todo_description, 
            todo_priority: todo.todo_priority, 
            todo_status: updatedStatus
        }

        try {
            let response = await fetch("https://hapitodos.onrender.com/todo/" + todo._id, {
                method: "PUT", 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo)
            }); 
            
            if(!response.ok) {
                throw new Error("gick inte att uppdatera")
            }

            getTodos(); 
            

        } catch(error) {
            console.log("något gick fel" + error); 
        }
    }


    return(
        <>
        {
            todos.map((todo) => (
                <div className="todo-div" key={todo._id}>
                    <h1>{ todo.todo_title }</h1> 
                    <p>{ todo.todo_description }</p>
                    <p>{ todo.todo_priority}</p>
                    <p>{ todo.todo_status}</p>

                    <form>
                        <label htmlFor="updateStatus">Ändra status</label><br />
                        <select name="updateStatus" id="updateStatus" defaultValue={todo.todo_status}
                        onChange={(e) => updateTodoStatus(e, todo)}>
                            <option >Ej påbörjad</option>
                            <option>Påbörjad</option>
                            <option>Avslutad</option>
                        </select>

                    </form>
                    <button onClick= {() => deleteTodo(todo._id)}>Radera</button>
                </div>
            ))
        }
        </>
    )
}

export default TodoList; 
