import React, { useEffect, useState } from 'react'
import axios from "axios"
export default function Register() {
    const [newTodo, setNewTodo] = useState({})
    const [allTodo, setAllTodo] = useState([])
    const [isEditing, setIsEditing] = useState(false)

    const handleGetAllTodo = async () => {
        try {
            const res = await axios.get("http://localhost:7800/api/v1/todo")
            setAllTodo(res.data)
        }
        catch (error) {
            console.log("error")
        }
    }

    useEffect(() => {
        handleGetAllTodo()
    }, [])

    const handleGetInput = (e) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value })
    }
    const handleAdd = async () => {
        try {
            if (!isEditing) {
                const res = await axios.post("http://localhost:7800/api/v1/todo", {
                    ...newTodo,
                    id: Math.floor(Math.random() * 999999)
                })
                setNewTodo({ nameTodo: "", todo: "" })
                setAllTodo(res.data.todo)
            }
            else {
                const response = await axios.put(
                    `http://localhost:7800/api/v1/todo/${newTodo.id}`,
                    newTodo
                  );
                  setAllTodo(response.data.todo);
                  setNewTodo({ nameTodo: "", todo: "" });
                  setIsEditing(false);
            }
        }
        catch (error) {
            console.log("error")
        }
    }

    const handleEdit = ((item)=>(
        setNewTodo(item),
        setIsEditing(true)
    ))
    const handleDelete = async (id)=>{
        try{
            const res = await axios.delete(`http://localhost:7800/api/v1/todo/${id}`);
            setAllTodo(res.data.todo)
        }
        catch(error){
            console.log("error")
        }
    }



    return (
        <div>
            <h1>TodoList</h1>
            <label>Tên Todo</label>
            <input
                type="text"
                name='nameTodo'
                onChange={handleGetInput}
                value={newTodo.nameTodo}
            /> <br></br>
            <label>Todo</label>
            <input
                type="text"
                name='todo'
                onChange={handleGetInput}
                value={newTodo.todo}
            /> <br></br>
            <button onClick={handleAdd}>{isEditing ? "Update" : "Add"}</button>
            <div>
                {allTodo.map((item, index) => (
                    <div key={index}>
                        <p>{item.nameTodo}</p>
                        <p>{item.todo}</p>
                        <button onClick={()=>handleEdit(item)}>Sửa</button>
                        <button onClick={()=>handleDelete(item.id)}>Xoá</button>
                    </div>

                ))}
            </div>
        </div>
    )
}
