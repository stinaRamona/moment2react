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
    return(
        <>
        
        </>
    )
}

export default TodoList; 
