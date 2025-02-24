import { useState } from "react";
import "../css/TodoForm.css"; 

function TodoForm({ onTodoAdded } : { onTodoAdded: () => void}) {

    //interface för fomulär
    
    interface FormInterface {
        todo_title: string, 
        todo_description?: string, 
        todo_priority: number, 
        todo_status: string
    };

    //interface för errors
    interface ErrorInterface {
        title?: string, 
        description?: string, 
        priority?: string
    }

    // form states
    const [formData, setFormData] = useState<FormInterface>({todo_title: "", todo_description: "", todo_priority: 1, todo_status: "Ej påbörjad"}); 

    //error states 
    const [formError, setFormErrors] = useState<ErrorInterface>({})

    const validateForm = ((data: FormInterface) => {
        const validationErrors: ErrorInterface = {}; 

        //om inget data skickats med i title
        if(!data.todo_title) {
            validationErrors.title = "Du måste ange en todo"
        }

        if(data.todo_priority > 5 || data.todo_priority < 1) {
            validationErrors.priority = "Välj en siffra mellan 1-5"
        } 

        return validationErrors; 

    })

    //så att sidan inte laddas om automatiskt vid submit
    const submitForm = (async (event: any) => {
        event.preventDefault(); 

        const validationErrors = validateForm(formData)

        if(Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors); 

            console.log("Innehåller fel!")
        } else {
            setFormErrors({}); 

            //gör ett POST anrop till databasen om allt är ok
            try {
                const response = await fetch("https://hapitodos.onrender.com/todo", {
                    method: "POST", 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if(!response.ok) {
                    throw new Error ("Kunde inte skicka datan")
                } 

                onTodoAdded(); //istället för att ladda om sidan så anropas funktionen som hämtar in todos
            } catch(error) {
                //konsoll test för utveckling
                console.log(error); 
            }
            
            
        }
    })

    return(
        <form onSubmit={submitForm}>
            <label htmlFor="title">Todo:</label><br />
            <input type="text" name="title" id="title" value={formData.todo_title}
            onChange={(event) => setFormData({...formData, todo_title: event.target.value})}
            />
            <br />
            {formError.title && <span>{formError.title}</span>}
            <br />
            <label htmlFor="description">Beskrivning:</label><br />
            <input type="text" name="description" id="description" value={formData.todo_description} 
            onChange={(event) => setFormData({...formData, todo_description: event.target.value})}
            /><br />

            <label htmlFor="priority">Prioritet:</label><br />
            <input type="number" name="priority" id="priority" value={formData.todo_priority}
            onChange={(event) => setFormData({...formData, todo_priority: +(event.target.value)})} //plus gör on sträng till nummer
            /> 
            <br />
            {formError.priority && <span>{formError.priority}</span>}
            <br />
            <label htmlFor="status">Status:</label><br />
            <select name="status" id="status" value={formData.todo_status}
            onChange={(event) => setFormData({...formData, todo_status: event.target.value})} 
            >
                <option>Ej påbörjad</option>
                <option>Påbörjad</option>
                <option>Avslutad</option>
            </select><br />

            <input type="submit" value="Lägg till" />

        </form>
    )
}

export default TodoForm; 