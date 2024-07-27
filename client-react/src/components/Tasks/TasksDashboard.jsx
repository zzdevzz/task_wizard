import React from "react"
import { Outlet } from "react-router-dom"
import TaskList from "./TaskList"

import { API_URL } from "../../constants"
import { AuthContext } from "../Authorisation/AuthProvider"
const TaskContext = React.createContext()

export default function TasksDashboardHost(){

    
    const { token, logout } = React.useContext(AuthContext)
    const [tasks, setTasks ] = React.useState([])
    console.log(token)
    const retrieveTasks = async () => {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          })
        const data = await response.json()
        setTasks(data)
        console.log("dashboard component loaded async")
        // console.log(data)
    }

    
    React.useEffect(()=>{
        retrieveTasks()
        console.log("dashboard component loaded useEffect")
    },[])
    
    return(
        <TaskContext.Provider value={[tasks, retrieveTasks]}>
            <div className="dashboard row">
                <div className="dashboard-list col-lg-4">
                    <TaskList/>
                </div>
                <div className="dashboard-detail col-lg-8 mt-5 d-flex">
                    <Outlet className="bg-dark"/>
                </div>
            </div>
        </TaskContext.Provider>
    )
}

export { TaskContext }