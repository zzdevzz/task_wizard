import React from "react"
import { Link } from "react-router-dom"


import { TaskContext } from "./TasksDashboard"

export default function NewTask(){ 

    const { openModal } = React.useContext(TaskContext)
    
    return (
        <Link className="create-task" to="new" onClick={openModal}>
            <p className="m-0">
                +
            </p>
        </Link>
    )
}