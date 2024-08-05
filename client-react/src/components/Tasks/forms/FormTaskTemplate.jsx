import React from "react"
import { appendErrors, useForm } from "react-hook-form"

export default function FormTask({method,data, deleteMethod}){


    // Even though component re-renders, data wont change unless form is reset with default values.


    const [buttonText, setButtonText] = React.useState("Create")


    React.useEffect(() => {

        if (method.name === "updateTask"){
            setButtonText("Update")
            reset(data)
        } else{
            reset(data)
        }
    },[data])



    // Base form used  to both create and edit a task. We take the post / patch request as a prop as well as default values if they exist.


    const {register, handleSubmit, reset, formState: { errors }} = useForm({defaultValues: data})


    return (
        <>
            <form onSubmit={handleSubmit((info) => method(info))}>
                <div>
                    <label htmlFor="name" className="form-label">Task Name</label>
                    <input id="name" className="form-control"{...register("name", { required: "Task name is required" })} placeholder="Task Name" />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor="description">Task Description</label>
                    <input id="description" className="form-control" {...register("description")}
                    placeholder="Task Description" />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>
                <div>
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select id="priority" className="form-control" {...register("priority", { required: "Priority is required" })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    </select>
                    {errors.priority && <span>{errors.priority.message}</span>}
                </div>
                <div>
                    <label htmlFor="status" className="form-label">Status</label>
                    <select id="status" className="form-control"{...register("status", { required: "Status is required" })}>
                    <option value="to_be_done">To Be Done</option>
                    <option value="in_progress">In Progress</option>
                    <option value="to_be_reviewed">To Be Reviewed</option>
                    </select>
                    {errors.status && <span>{errors.status.message}</span>}
                </div>
                <div>
                    <label htmlFor="date_completed_by" className="form-label">Date Completed By</label>
                    <input id="date_completed_by" type="date" className="form-control"{...register("date_completed_by")} />
                </div>
                <div>
                    <label htmlFor="completed">Completed</label>
                    <input id="completed" type="checkbox" {...register("completed")} />
                </div>
                <input type="submit" value={buttonText}/>
                { buttonText === "Update" && <button onClick={deleteMethod}>Delete</button>}
            </form>
        </>
    )
}
