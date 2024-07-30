import React from "react"
import FormTaskTemplate from "./FormTaskTemplate"
import { useParams, useNavigate, useLocation, Navigate, redirect } from "react-router-dom"
import { API_URL } from "../constants"
import api from "../utils/api"

import { TaskContext } from "./Tasks/TasksDashboard"
import { AuthContext } from "./Authorisation/AuthProvider"


export default function FormTask({request = "post"}){
  

  const navigate = useNavigate()
  const location = useLocation()

  
  // console.log("FormTask Render")

  // State is being passed if task is existing. If new task and state isn't passed we need to pass empty objects.

  let task = {} 
  let taskId, userId

  if (location.state !== null) {
    task = location.state.taskData
    taskId = task.id
    userId = task.user_id
    
  }

  // Destructing and renaming object of multiple values
  const {1: retrieveTasks} = React.useContext(TaskContext)
  const { token } = React.useContext(AuthContext)

  const params = useParams()
  const taskURL = API_URL + "/" + params.id
  const [redirect, setRedirect] = React.useState(false)

  // Post data to database.

  const createTask = async (data) => {

    try {
      // const response = await fetch('http://localhost:3000/api/v1/tasks', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': token
      //   },
      //   body: JSON.stringify(data),
      // })

      const response = api.post(`${API_URL}/tasks`, {task: data})
      
      //   Even though we have a try catch block. Not all incomplete requests throw appendErrors. They still fulfil thier promise with an error message so we have to check if its okay and chuck an error.
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      
      const result = await response.json();
      retrieveTasks()
      console.log('Task created successfully:', result);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  const updateTask = async (data) => {
    const url = `http://localhost:3000/api/v1/tasks/${taskId}`
    try {
        const response = await fetch(url, {method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
          body: JSON.stringify(data)
        })
        
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
      const url = `http://localhost:3000/api/v1/tasks/${taskId}`
      try {
          const response = await fetch(url, {method: 'DELETE', 
            headers: {'Authorization': token}
          })
          if (response.ok) {
              setRedirect(true)
              retrieveTasks()
              navigate("..")
          }
      } catch (error) {
          console.error("Error:  ",  error) 
      }
  }

  const actions = {
    "post" : createTask,
    "patch" : updateTask,
    "delete" : deleteTask
  }

  return (
    <>    
      <FormTaskTemplate key={task.id || "new" } method={actions[request]} data={task} deleteMethod={actions["delete"]}/>
    </>
  )
}
