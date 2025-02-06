
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import Header from './components/Header'
import TodoForm from './components/TodoForm'

function App() {

  return (
    <>
      <Header />

      <main>
        <h2>Lägg till en todo</h2>
        <TodoForm />

        <h2>Dina todos <i className="fa-solid fa-list-check"></i></h2>
        <TodoList /> 
      </main>

      <Footer />
    </>
  )
}

export default App
