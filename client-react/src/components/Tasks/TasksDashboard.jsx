import React from "react"
import { Outlet } from "react-router-dom"
import TaskList from "./TaskList"

import { API_URL } from "../../constants"
import { AuthContext } from "../Authorisation/AuthProvider"
import api from "../../utils/api"

import NewTask from "./NewTask"

const TaskContext = React.createContext()

export default function TasksDashboardHost(){
    const { token, logout } = React.useContext(AuthContext)
    const [tasks, setTasks ] = React.useState([])
    const retrieveTasks = async () => {
        const response = await api.get(`${API_URL}/tasks`, {headers: {Authorization: token}})
        setTasks(response.data)
    }


    React.useEffect(()=>{
        retrieveTasks()
    },[])

    return(
        <TaskContext.Provider value={[tasks, retrieveTasks]}>
            <div className="dashboard row h-100">
                <div className="col max-height my-3">
                    <TaskList/>
                </div>
                <NewTask/>
                <div className="dashboard-detail col-lg-8 d-flex my-2">
                    <Outlet/>
                </div>
            </div>
        </TaskContext.Provider>
    )
}

export { TaskContext }
