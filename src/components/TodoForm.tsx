import { useState } from "react";


function TodoForm() {

    
    interface FormInterface {
        title: string, 
        description: string, 
        priority: number, 
        status: string
    };

    const [formData, setFormData] = useState<FormInterface>({title: "", description: "", priority: 1, status: "Ej påbörjad"}); 

    return(
        <form>
            <label htmlFor="title">Todo:</label><br />
            <input type="text" name="title" id="title" value={formData.title}
            onChange={(event) => setFormData({...formData, title: event.target.value})}
            /><br />

            <label htmlFor="description">Beskrivning:</label><br />
            <input type="text" name="description" id="description" value={formData.description} 
            onChange={(event) => setFormData({...formData, description: event.target.value})}
            /><br />

            <label htmlFor="priority">Prioritet:</label><br />
            <input type="number" name="priority" id="priority" value={formData.priority}
            onChange={(event) => setFormData({...formData, priority: +(event.target.value)})} //plus gör on sträng till nummer
            /> <br />

            <label htmlFor="status">Status:</label><br />
            <select name="status" id="status" value={formData.status}
            onChange={(event) => setFormData({...formData, status: event.target.value})} 
            >
                <option value="ej påbörjad">Ej påbörjad</option>
                <option value="påbörjad">Påbörjad</option>
                <option value="avslutad">Avslutad</option>
            </select><br />

            <input type="submit" value="Lägg till" />
        </form>
    )
}

export default TodoForm; 