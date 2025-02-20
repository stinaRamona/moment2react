//För inhämtning och utskrivning av todos 
import "../css/TodoList.css"
import { useState } from "react";
import { useEffect } from "react"; 

//inteface över svaret från webbtjänsten 

interface Todo {
    _id: number,
    todo_title: string, 
    todo_description?: string, 
    todo_priority: number, 
    todo_status: string
}; 



function TodoList() {
    //State för Todo
    const [todos, setTodo] = useState<Todo [] | []>([]); 
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string>(""); 

    //useEffect 
    useEffect(() => {
        getTodos(); 
    }, []); 

    //funktion för att hämta in todos 
    const getTodos = async () => {
        try {
            setLoading(true); 

            const response = await fetch("https://hapitodos.onrender.com/todo"); 

            const data = await response.json(); 

            setTodo(data); 

        } catch(error) {
            setError("Gick inte att ladda in listan. Försök igen senare"); 
        } finally {
            setLoading(false); 
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
            setError("Det gick inte att ta bort todo. Försök igen senare")
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
            setError("Gick inte att uppdatera status. Försök igen senare"); 
            console.log("något gick fel" + error); 
        }
    }


    return(
        <>
            <div id="loadingSpinner">
                {loading && <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>}
            </div>
            
            <span id="errorMsg">{error}</span>
        {
            todos.map((todo) => (
                <div className="todo-div" key={todo._id}>
                    <h3>{ todo.todo_title }</h3> 
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
                    <br />
                    <button onClick= {() => deleteTodo(todo._id)}>Radera <i className="fa-solid fa-trash"></i></button>
                </div>
            ))
        }
        </>
    )
}

export default TodoList; 
