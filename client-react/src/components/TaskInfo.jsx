import React from "react"
import { useParams, Navigate } from "react-router-dom"
import { appendErrors, useForm } from "react-hook-form"
import { API_URL } from "../constants"


export default function TaskInfo(props){
    const params = useParams()
    const taskURL = API_URL + "/" + params.id

    const [task, setTask] = React.useState({})
    const {id : taskId, user_id } = task 
    const [redirect, setRedirect] = React.useState(false)
    
    const {register, handleSubmit, reset, formState: { errors }} = useForm({values: task})
    
    // Look at method incase this request fails
    const fetchTask = async () => {
        try {
            const task = await fetch(taskURL)
            const data = await task.json()
            setTask(data)
            reset(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    
    const deleteTask = async () => {
        const url = `http://localhost:3000/api/v1/users/${user_id}/tasks/${taskId}`
        try {
            const response = await fetch(url, {method: 'DELETE'})
            if (response.ok) {
                setRedirect(true)
            }
        } catch (error) {
            console.error("Error:  ",  error) 
        }
    }
    
    const postTask = async (data) => {
        const url = `http://localhost:3000/api/v1/users/${user_id}/tasks/${taskId}`
        try {
            const response = await fetch(url, {method: 'PATCH', 
                headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            })
            
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
            
            <form onSubmit={handleSubmit(postTask)}>
                <div>
                    <label htmlFor="name">Task Name</label>
                    <input id="name" {...register("name", { required: "Task name is required" })} placeholder="Task Name" />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>             
                <div>
                    <label htmlFor="description">Task Description</label>
                    <input id="description" {...register("description")} 
                    placeholder="Task Description" />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>
                <div>
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" {...register("priority", { required: "Priority is required" })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    </select>
                    {errors.priority && <span>{errors.priority.message}</span>}
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select id="status" {...register("status", { required: "Status is required" })}>
                    <option value="to_be_done">To Be Done</option>
                    <option value="in_progress">In Progress</option>
                    <option value="to_be_reviewed">To Be Reviewed</option>
                    </select>
                    {errors.status && <span>{errors.status.message}</span>}
                </div>
                <div>
                    <label htmlFor="date_completed_by">Date Completed By</label>
                    <input id="date_completed_by" type="date" {...register("date_completed_by")} />
                </div>
                <div>
                    <label htmlFor="completed">Completed</label>
                    <input id="completed" type="checkbox" {...register("completed")} />
                </div>
                <input type="submit" value="update"/>
            </form>
            <button onClick={deleteTask}>Delete Task</button>
        </>
    )
}