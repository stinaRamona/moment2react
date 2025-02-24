import { useState } from "react";
import { useEffect } from "react"; 

import TodoList from './components/TodoList'
import Footer from './components/Footer'
import Header from './components/Header'
import TodoForm from './components/TodoForm'

function App() {

  //inteface över svaret från webbtjänsten 

  interface Todo {
    _id: number,
    todo_title: string, 
    todo_description?: string, 
    todo_priority: number, 
    todo_status: string
  };  

  //State för Todo
  const [todos, setTodo] = useState<Todo [] | []>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(""); 

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

    //useEffect 
    useEffect(() => {
      getTodos(); 
    }, []);

  return (
    <>
      <Header />

      <main>
        <h2>Lägg till en todo</h2>
        <TodoForm onTodoAdded={getTodos}/>

        <h2>Dina todos <i className="fa-solid fa-list-check"></i></h2>
        <TodoList todos={todos} loading={loading} error={error} onDelete={getTodos}/> 
      </main>

      <Footer />
    </>
  )
}

export default App
