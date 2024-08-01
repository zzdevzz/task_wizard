import React from "react"

export default function TaskPreview({taskData}){
    const { name, description} = taskData
    return (
        
        <li className="task-preview list-group-item">
            <h2>{name}</h2>
            <p>{description}</p>
        </li>
    )
}