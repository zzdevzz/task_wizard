import React, { useContext } from "react"
import { API_URL } from "../../constants"
import { api } from "../../utils/api"


import { motion, useAnimation } from "framer-motion"

import { IMAGES } from "../../assets/images/Image"

// Define possible statuses
const statuses = ["to_be_done", "in_progress", "to_be_reviewed"]

export default function TaskPreviewFake({name,description,status, priority }) {
  
    
    const [statusHold, setStatusHold ] = React.useState(status)
    const controls = useAnimation()

    const handleStatusChange = async () => {
      // Find the index of the current status
      const currentIndex = statuses.indexOf(statusHold)
  
      // Calculate the next status (looping back to the first if necessary)
      setStatusHold(statuses[(currentIndex + 1) % statuses.length])
  
      controls.start({
        rotate: [0, -15, 15, -10, 10, -5, 5, 0],  // Rotate back and forth
        transition: { duration: 0.5 },  // Duration of the shake
      })
}

  // Function to determine the box color based on the current status
  const getStatusColor = () => {
    if (statusHold === "to_be_done") return "color-todo fake"
    if (statusHold === "in_progress") return "color-wip"
    if (statusHold === "to_be_reviewed") return "color-done"
    return "red" // Default to red if no status matches
  }
  
  return (
    <div className={`task-preview d-flex align-items-center ${priority === "urgent" ? "urgent" : ""} ${getStatusColor()}`}>
      <motion.div
        className={`box text-center gem ${getStatusColor()}`}
        onClick={handleStatusChange}
        title="Click to change status"
        animate={controls}
      >
        <img src={IMAGES.gemBase} alt="Magic Crystal" style={{transform: "scale(1.1)"}} className="px-2 h-100"/>
      </motion.div>
      <div className={`overflow-hidden ms-3 w-100 h-100 d-flex flex-column justify-content-center ${status === "to_be_reviewed" ? "task-complete" : ""}`} onClick={() => handleTaskClick(taskData)}>
        <h2 className="text-truncate">{name}</h2>
        <p className="text-truncate">{description}</p>
      </div>
    </div>
  )
}
