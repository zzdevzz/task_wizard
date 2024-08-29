import React, { useContext } from "react"
import { API_URL } from "../../constants"
import { api } from "../../utils/api"
import { TaskContext } from "./TasksDashboard"
import { AuthContext } from "../Authorisation/AuthProvider"

import { motion, useAnimation } from "framer-motion"

import IMAGES from "../../assets/images/Image"

// Define possible statuses
const statuses = ["to_be_done", "in_progress", "to_be_reviewed"]

export default function TaskPreview({ taskData }) {

  // Use task's current status from props
  // const [currentStatus, setCurrentStatus] = React.useState(taskData.status)

  const { additionalInfo, setAdditionalInfo, 
          selectedTask,  setSelectedTask,
          retrieveTasks,
          tasks, setTasks,
          openModal } = React.useContext(TaskContext)

  // Context to retrieve tasks and auth token
  // const { retrieveTasks } = useContext(TaskContext)
  const { token } = useContext(AuthContext)

  const controls = useAnimation()

  // Function to handle status change
  const handleStatusChange = async () => {
    // Find the index of the current status
    const currentIndex = statuses.indexOf(taskData.status)

    // Calculate the next status (looping back to the first if necessary)
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]

    controls.start({
      rotate: [0, -15, 15, -10, 10, -5, 5, 0],  // Rotate back and forth
      transition: { duration: 0.5 },  // Duration of the shake
    })

    // Update the status on the backend by making an API call
    const url = `${API_URL}/tasks/${taskData.id}`
    try {
      // Send a PATCH request to update the task's status
      await api.patch(url, { task: { status: nextStatus } }, { headers: { Authorization: token } })

      // If the API call is successful, update the local state
       // Update the local task list in context
       const updatedTasks = tasks.map(task => 
        task.id === taskData.id ? { ...task, status: nextStatus } : task
      )
      setTasks(updatedTasks)

      // Update the selected task in context if it's the current one
      if (selectedTask?.id === taskData.id) {
        setSelectedTask({ ...taskData, status: nextStatus })
      }


      // Optionally refresh the task list (e.g., to show the updated task in the list)
      retrieveTasks()

    } catch (error) {
      console.error("Error updating task status:", error)
    }
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    openModal()  // Update selected task in context
  }
  // Function to determine the box color based on the current status
  const getStatusColor = () => {
    if (taskData.status === "to_be_done") return "color-todo"
    if (taskData.status === "in_progress") return "color-wip"
    if (taskData.status === "to_be_reviewed") return "color-done"
    return "red" // Default to red if no status matches
  }

  return (
    <li className={`task-preview d-flex align-items-center ${taskData.priority === "urgent" ? "urgent" : ""} ${getStatusColor()}`}>
      <motion.div
        className={`box text-center gem ${getStatusColor()}`}
        onClick={handleStatusChange}
        title="Click to change status"
        animate={controls}
      >
        <img src={IMAGES.gemBase} alt="Magic Crystal" style={{transform: "scale(1.1)"}} className="h-100"/>
      </motion.div>
      <div className={`overflow-hidden ms-4 w-100 h-100 d-flex flex-column justify-content-center ${taskData.status === "to_be_reviewed" ? "task-complete" : ""}`} onClick={() => handleTaskClick(taskData)}>
        <h2 className="text-truncate">{taskData.name}</h2>
        <p className="text-truncate">{taskData.description}</p>
      </div>
    </li>
  )
}
