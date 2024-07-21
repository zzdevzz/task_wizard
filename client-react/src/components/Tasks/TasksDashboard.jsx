import React from "react"
import { Outlet, useParams } from "react-router-dom"
import TaskList from "./TaskList"

import { API_URL } from "../../constants"
const TaskContext = React.createContext()

export default function TasksDashboardHost(){

    const [tasks, setTasks ] = React.useState([])
    const params = useParams()
    console.log(params)

    const retrieveTasks = async () => {
        const response = await fetch(API_URL)
        const data = await response.json()
        setTasks(data)
    }

    React.useEffect(()=>{
        retrieveTasks()
    },[])

    return(
        <TaskContext.Provider value={[tasks, retrieveTasks]}>
            <div className="dashboard">
                <div className="dashboard-list col-lg-4">
                    <TaskList/>
                </div>
                <div className="dashboard-detail col-lg-8">
                    <Outlet/>
                </div>
            </div>
        </TaskContext.Provider>
    )
}

export { TaskContext }