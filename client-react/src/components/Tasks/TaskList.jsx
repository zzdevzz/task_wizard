import React from "react"
import { Link } from "react-router-dom"
import TaskPreview from "./TaskPreview"

import { TaskContext } from "./TasksDashboard"

export default function TaskList() {

    const {0: tasks} = React.useContext(TaskContext)
    const sortedTasks = [...tasks].sort((a, b) => a.id - b.id)


    return (
        <ul className="dashboard-list py-2">
            {sortedTasks.map((task) => (
                <div key={task.id}
                className="post-container">
                    <Link to={`${task.id}`} state={{taskData: task}}>
                        <TaskPreview taskData={task}/>
                    </Link>
                </div>
            ))}
        </ul>
    )
}
