import React from "react"
import { Link } from "react-router-dom"
import TaskInfo from "../TaskInfo"
import TaskPreview from "./TaskPreview"
import FormTask from "../FormTask"
import { API_URL } from "../../constants"

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
        <div className="dashboard">
            <div className="dashboard-list col-lg-4">
                <ul className="list-group list-group-horizontal">
                    {tasks.map((task) => (
                        <div key={task.id}
                        className="post-container">
                            <Link to={`${task.id}`} state={{taskData: task}}>                 
                                <TaskPreview taskData={task}/>
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}