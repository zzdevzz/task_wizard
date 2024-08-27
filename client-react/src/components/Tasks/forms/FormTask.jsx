import React from "react"
import FormTaskTemplate from "./FormTaskTemplate"
import { useParams, useNavigate, useLocation, Navigate, redirect } from "react-router-dom"
import { API_URL } from "../../../constants"
import { api } from "../../../utils/api"

import { toast } from 'react-toastify';


import { TaskContext } from "../TasksDashboard"
import { AuthContext } from "../../Authorisation/AuthProvider"


export default function FormTask({request = "post"}){


  const navigate = useNavigate()
  const location = useLocation()


  // State is being passed if task is existing. If new task and state isn't passed we need to pass empty objects.

  let task = {}
  let taskId, userId

  if (location.state !== null) {
    task = location.state.taskData
    taskId = task.id
    userId = task.user_id

  }

  // Destructing and renaming object of multiple values
  const {retrieveTasks} = React.useContext(TaskContext)
  const { token } = React.useContext(AuthContext)


  const [redirect, setRedirect] = React.useState(false)

  // Post data to database.

  const createTask = async (data) => {

    try {
      console.log("Try block set")
      const response = await api.post(`/tasks`, {task: data}, {headers: {'Authorization': token}})
      retrieveTasks()
      console.log('Task created successfully:', response);
      toast.success('New Task Added')
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(`Error: `, error)
    }
  }

  const updateTask = async (data) => {
    const url = `${API_URL}/tasks/${taskId}`
    try {
        const response = await api.patch(url, {task: data}, {headers: {'Authorization': token}})
        retrieveTasks()
        toast.success('Task updated successfully!')
    } catch (error) {
        console.error("Error:  ",  error)
    }
  }


  // Delete task from database.
  const deleteTask = async () => {
      const url = `${API_URL}/tasks/${taskId}`
      try {
          const response = await api.delete(url, {headers: {'Authorization': token}})
          setRedirect(true)
          retrieveTasks()
          navigate("..")
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
      <FormTaskTemplate key={task.id || "new" } method={actions[request]} deleteMethod={actions["delete"]}/>
    </>
  )
}
