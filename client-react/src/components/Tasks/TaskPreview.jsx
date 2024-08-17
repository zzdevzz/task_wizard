import React from "react"

export default function TaskPreview({taskData}){
    const { name, description} = taskData
    return (
        <li className="task-preview list-group-item glass-container d-flex">
            <div className="box me-3"></div>
            <div className="overflow-hidden">
                <h2 className="text-truncate">{name}</h2>
                <p className="text-truncate">{description}</p>
            </div>
        </li>
    )
}
