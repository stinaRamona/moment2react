
function TodoForm() {
    return(
        <>
        <form method="POST">
            <label htmlFor="todo_title">Todo:</label><br />
            <input type="text" /><br />

            <label htmlFor="todo_description">Beskrivning:</label><br />
            <input type="text" /><br />

            <label htmlFor="todo_status">Status:</label><br />
            <select name="todo_status" id="todo_status">
                <option value="ej påbörjad">Ej påbörjad</option>
                <option value="påbörjad">Påbörjad</option>
                <option value="avslutad">Avslutad</option>
            </select><br />

            <label htmlFor="todo_priority">Prioritet:</label><br />
            <select name="todo_priority" id="todo_priotiry">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select><br />

            <input type="submit" value="Lägg till" />
            
        </form>
        </>
    )
}

export default TodoForm; 