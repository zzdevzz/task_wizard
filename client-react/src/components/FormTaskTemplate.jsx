import React from "react"
import { appendErrors, useForm } from "react-hook-form"

export default function FormTest({method,data}){

    // Even though component re-renders, data wont change unless form is reset with default values.

    React.useEffect(() => {
        reset(data)
    },[data])

    // const [task, setTask] = React.useState({})
    // const {id : taskId, user_id } = data
    // const [redirect, setRedirect] = React.useState(false)
    // const [newTask, setNewTask] = React.useState(true)
    const [buttonText, setButtonText] = React.useState("Submit")

    // Base form used  to both create and edit a task. We take the post / patch request as a prop as well as default values if they exist. 

    
    const {register, handleSubmit, reset, formState: { errors }} = useForm({defaultValues: data})
    
    React.useEffect(() => {
        if (method.name === "updateTask"){
            setButtonText("Update")
            reset(data)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit((info) => method(info))}>
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
                <input type="submit" value={buttonText}/>
                
            </form>
        </>
    )
}