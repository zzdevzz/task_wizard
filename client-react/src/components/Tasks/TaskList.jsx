import React from "react"
import { Link } from "react-router-dom"
import TaskPreview from "./TaskPreview"

import { TaskContext } from "./TasksDashboard"

export default function TaskList() {
    // const [tasks, setTasks ] = React.useState([])

    // const retrieveTasks = async () => {
    //     const response = await fetch(API_URL)
    //     const data = await response.json()
    //     setTasks(data)
    // }

    const {0: tasks} = React.useContext(TaskContext)

    return (

        <ul className="dashboard-list list-group list-group-vertical">
            {tasks.map((task) => (
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