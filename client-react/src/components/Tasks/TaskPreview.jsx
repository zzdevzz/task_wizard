import React from "react"

export default function TaskPreview({taskData}){
    const { name, description} = taskData
    return (
        <li className="list-group-item bg-light text-start">
            <h2>{name}</h2>
            <p>{description}</p>
        </li>
    )
}