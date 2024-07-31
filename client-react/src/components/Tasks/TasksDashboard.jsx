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
            <div className="dashboard row">
                <div className="col-lg-4">
                    <TaskList/>
                </div>
                <div className="">
                    <NewTask/>
                </div>
                <div className="dashboard-detail col-lg-8 mt-5 d-flex">
                    <Outlet className="bg-dark"/>
                </div>
            </div>
        </TaskContext.Provider>
    )
}

export { TaskContext }