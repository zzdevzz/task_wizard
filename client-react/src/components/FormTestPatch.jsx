import React from "react"
import { appendErrors, useForm } from "react-hook-form"

export default function FormTest(){
    const {register, handleSubmit, formState: { errors }} = useForm()

    const onSubmitPatch = async (data) => {
        console.log(data)
    
        try {
          const response = await fetch('http://localhost:3000/api/v1/users/1/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })

        //   Even though we have a try catch block. Not all incomplete requests throw appendErrors. They still fulfil thier promise with an error message so we have to check if its okay and chuck an error.

          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
    
          const result = await response.json();
          console.log('Task created successfully:', result);
        } catch (error) {
          console.error('Error creating task:', error);
        }
      }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitPatch)}>
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
                <input type="submit"/>
            </form>
        </>
    )
}
