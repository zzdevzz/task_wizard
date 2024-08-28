import React from "react"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons"

import { TaskContext } from "./TasksDashboard"

export default function NewTask(){ 

    const { openModal } = React.useContext(TaskContext)
    
    return (
        <Link className="create-task" to="new" onClick={openModal}>
            <FontAwesomeIcon icon={faWandMagicSparkles} className="fs-2"/>
        </Link>
    )
}