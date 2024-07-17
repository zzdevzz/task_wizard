import React from "react"
import { appendErrors, useForm } from "react-hook-form"

export default function FormTest(){
    const {register, handleSubmit} = useForm()

    const onSubmit = async (data) => {
        console.log(data)
    
        try {
          const response = await fetch('http://localhost:3000/api/v1/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", {required: true})} 
                placeholder="Task Name"/>
                <input {...register("description", {required: true, minLength: 4})} 
                placeholder="Task Description"/>
                <input {...register("priority", {required: true, minLength: 4})} 
                placeholder="Priority"/>
                <input type="submit"/>
            </form>
        </>
    )
}
