import React, { useState, useContext } from "react"
import { API_URL } from "../../constants"
import { api } from "../../utils/api"
import { TaskContext } from "./TasksDashboard"
import { AuthContext } from "../Authorisation/AuthProvider"

import IMAGES from "../../assets/images/Image"

// Define possible statuses
const statuses = ["to_be_done", "in_progress", "to_be_reviewed"]

export default function TaskPreview({ taskData }) {

  // Use task's current status from props
  const [currentStatus, setCurrentStatus] = useState(taskData.status)

  // Context to retrieve tasks and auth token
  const { 1: retrieveTasks } = useContext(TaskContext)
  const { token } = useContext(AuthContext)

  // Function to handle status change
  const handleStatusChange = async () => {
    // Find the index of the current status
    const currentIndex = statuses.indexOf(currentStatus)

    // Calculate the next status (looping back to the first if necessary)
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]

    // Update the status on the backend by making an API call
    const url = `${API_URL}/tasks/${taskData.id}`
    try {
      // Send a PATCH request to update the task's status
      await api.patch(url, { task: { status: nextStatus } }, { headers: { Authorization: token } })

      // If the API call is successful, update the local state
      setCurrentStatus(nextStatus)

      // Optionally refresh the task list (e.g., to show the updated task in the list)
      retrieveTasks()

    } catch (error) {
      console.error("Error updating task status:", error)
    }
  }

  // Function to determine the box color based on the current status
  const getStatusColor = () => {
    if (currentStatus === "to_be_done") return "color-todo"
    if (currentStatus === "in_progress") return "color-wip"
    if (currentStatus === "to_be_reviewed") return "color-done"
    return "red" // Default to red if no status matches
  }

  return (
    <li className="task-preview d-flex align-items-center">
      <div
        className={`box text-center ${getStatusColor()}`}
        onClick={handleStatusChange}
        title="Click to change status"
      >
        <img src={IMAGES.gemBase} alt="Magic Crystal" style={{transform: "scale(1.1)"}} className="h-100"/>
      </div>
      <div className={`overflow-hidden ms-4 ${currentStatus === "to_be_reviewed" ? "task-complete" : ""}`}>
        <h2 className="text-truncate">{taskData.name}</h2>
        <p className="text-truncate">{taskData.description}</p>
      </div>
    </li>
  )
}
