import React from "react"
import { appendErrors, useForm } from "react-hook-form"

export default function FormTask({method,data, deleteMethod}){


    // Even though component re-renders, data wont change unless form is reset with default values.


    const [buttonText, setButtonText] = React.useState("Create")

    const currentDate = new Date().toISOString().split("T")[0]

    React.useEffect(() => {
        console.log("useEffect ran:")
        console.log("method: ", method.name)
        console.log("data: ", data)
        if (method.name === "updateTask" || method.name === "patch"){
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
            <form onSubmit={handleSubmit((info) => method(info))} className="w-100 dark-form-input">
                <div>
                    <label htmlFor="name" className="form-label">Task Name</label>
                    <input id="name" className="form-control"{...register("name", { required: "Task name is required" })} placeholder="Task Name" />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className="overflow-auto">
                    <label htmlFor="description">Task Description</label>
                    <textarea id="description" className="form-control overflow-auto" {...register("description")} rows="3"
            style={{ resize: 'vertical', maxHeight: '200px', overflowY: 'auto' }}
                    placeholder="Task Description" />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>
                <div className="d-flex">
                  <div className="w-100 me-2">
                      <label htmlFor="priority" className="form-label">Priority</label>
                      <select id="priority" className="form-control" {...register("priority", { required: "Priority is required" })}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      </select>
                      {errors.priority && <span>{errors.priority.message}</span>}
                  </div>
                  <div className="w-100">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select id="status" className="form-control"{...register("status", { required: "Status is required" })}>
                      <option value="to_be_done">To Be Done</option>
                      <option value="in_progress">In Progress</option>
                      <option value="to_be_reviewed">To Be Reviewed</option>
                      </select>
                      {errors.status && <span>{errors.status.message}</span>}
                  </div>
                </div>
                <div>
                  {data.date_completed_by = null ?
                  <>
                    <label htmlFor="date_completed_by" className="form-label">Date To Complete By</label>
                    <input id="date_completed_by" type="date" className="form-control"{...register("date_completed_by")} />
                  </> :
                  <>
                    <label htmlFor="date_created" className="form-label">Date Created</label>
                    <input id="date_created" type="date" className="form-control" defaultValue={currentDate} {...register("date_created")} />
                  </>
                }
                </div>
                <div className="my-3">
                    <label htmlFor="completed">Task Completed?</label>
                    <input id="completed" type="checkbox" {...register("completed")} />
                </div>
                <div className={buttonText === "Update" ? "d-flex gap-10" : ""}>
                    <div className="flex-fill mx-auto">
                        <button type="submit" className="pill-button w-100 bg-brand-blue">{buttonText}</button>
                    </div>
                    <div className="flex-fill mx-auto">
                        { buttonText === "Update" && <button onClick={deleteMethod} className="pill-button w-100">Delete</button>}
                    </div>
                </div>
            </form>
        </>
    )
}
