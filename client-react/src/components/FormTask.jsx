import React from "react"
import FormTaskTemplate from "./FormTaskTemplate"
import { useParams, Navigate, useLocation } from "react-router-dom"
import { API_URL } from "../constants"


import { TaskContext } from "./Tasks/TasksDashboard"


export default function FormTask({request = "post"}){

  const location = useLocation()
  console.log(location)
  
  // PROBLEM IS HERE FROM TASKLIST.
  // TASKLIST feeds us state to render a form.
  // If we have no state, we need to render a create form.
  // Create form somehow needs to get user ID passed from task menu.


  const task = location.state.taskData
  // console.log(task)

  // Destructing and renaming object of multiple values
  const {1: retrieveTasks} = React.useContext(TaskContext)

  const params = useParams()
  const taskURL = API_URL + "/" + params.id
  // const [task, setTask] = React.useState({})
  const {id : taskId, user_id } = task 
  const [redirect, setRedirect] = React.useState(false)

  // Post data to database.

  const createTask = async (data) => {

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/1/tasks', {
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

  const updateTask = async (data) => {
    const url = `http://localhost:3000/api/v1/users/${user_id}/tasks/${taskId}`
    try {
        const response = await fetch(url, {method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })

        console.log(response.ok)
        
        if (response.ok) {
            setRedirect(true)
            retrieveTasks()
        }
    } catch (error) {
        console.error("Error:  ",  error) 
    }
  }

  
  // Delete task from database.
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

  // Actions

  
  // React.useEffect(()=>{
  //   if (request === "patch") {
  //     fetchTask()
  //   }  
  // },[])

  const actions = {
    "post" : createTask,
    "patch" : updateTask,
    "delete" : deleteTask
  }

  // If nothing is provided
  return (
      <FormTaskTemplate method={actions[request]} data={task}/>
  )
}
