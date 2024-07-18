import React from "react"
import { useParams, Navigate } from "react-router-dom"
import { API_URL } from "../constants"

export default function TaskInfo(props){
    const params = useParams()
    const taskURL = API_URL + "/" + params.id

    const [task, setTask] = React.useState("")
    const [redirect, setRedirect] = React.useState(false)

    const fetchTask = async () => {
        try {
            const task = await fetch(taskURL)
            const data = await task.json()
            setTask(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const deleteTask = async () => {
        console.log(params)
        const id = params.id
        const url = `http://localhost:3000/api/v1/users/1/tasks/${id}`
        console.log(url)
        try {
            const response = await fetch(url, {method: 'DELETE'})
            if (response.ok) {
                setRedirect(true)
            }
        } catch (error) {
            console.error("Error:  ",  error) 
        }
    }


    React.useEffect(()=>{
        fetchTask()
        // console.log(task)
    },[])

    if (redirect) {
        return <Navigate to="/tasks" />
    }

    return (
        <>
            <h1>{task.name}</h1>
            <button onClick={deleteTask}>Delete Task</button>
        </>
    )
}