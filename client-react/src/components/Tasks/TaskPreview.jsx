import React from "react"

export default function TaskPreview({taskData}){
    const { name, description} = taskData
    return (

        <li className="task-preview list-group-item">
            <h2 className="text-truncate">{name}</h2>
            <p className="text-truncate">{description}</p>
        </li>
    )
}
