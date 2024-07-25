import React from "react"
import { Outlet } from "react-router-dom"
import TaskList from "./TaskList"

import { API_URL } from "../../constants"
const TaskContext = React.createContext()

export default function TasksDashboardHost(){

    console.log("dashboard component mounted")
    const [tasks, setTasks ] = React.useState([])
    console.log(localStorage.getItem('token'))

    const retrieveTasks = async () => {
        const response = await fetch(API_URL)
        const data = await response.json()
        setTasks(data)
        console.log("dashboard component loaded async")
        // console.log(data)
    }

    
    React.useEffect(()=>{
        retrieveTasks()
        console.log("dashboard component loaded useEffect")
    },[])
    
    // return(
    //     <TaskContext.Provider value={[tasks, retrieveTasks]}>
    //         <div className="dashboard">
    //             <div className="dashboard-list col-lg-4">
    //                 <TaskList/>
    //             </div>
    //             <div className="dashboard-detail col-lg-8">
    //                 <Outlet/>
    //             </div>
    //         </div>
    //     </TaskContext.Provider>
    // )
}

export { TaskContext }