import React from "react"
import { Outlet } from "react-router-dom"
import TaskList from "./TaskList"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API_URL } from "../../constants"
import { AuthContext } from "../Authorisation/AuthProvider"
import { api } from "../../utils/api"

import NewTask from "./NewTask"

const TaskContext = React.createContext()

// Needed to convert date in format to use with HTML form.
function formatDate(dateString) {
  if (!dateString) return "" // Handle null or undefined date
  return dateString.split("T")[0]
}

export default function TasksDashboardHost(){
    const { token, logout } = React.useContext(AuthContext)
    const [tasks, setTasks ] = React.useState([])
    const [selectedTask, setSelectedTask] = React.useState({})
    const [additionalInfo, setAdditionalInfo] = React.useState(false)

    // console.log("tasksdashboard: ", tasks)
    const retrieveTasks = async () => {
        const response = await api.get(`${API_URL}/tasks`, {headers: {Authorization: token}})
        const tasksFormatted = response.data.map((task) => ({
          ...task,
          date_completed_by: formatDate(task.date_completed_by),
          date_created: formatDate(task.date_created)
        }))
        setTasks(tasksFormatted)
    }


    React.useEffect(()=>{
        retrieveTasks()
    },[])

    return(
        <TaskContext.Provider value={{
            tasks, setTasks, retrieveTasks,
            selectedTask, setSelectedTask,
            additionalInfo, setAdditionalInfo
        }}>
            <div className="dashboard row align-content-start">
                <ToastContainer autoClose={2000}/>
                <div className="dashboard-detail col-lg-8 d-flex my-2 order-md-2">
                    <Outlet/>
                </div>
                <div className="col-lg-4 my-2 order-md-1">
                    <TaskList/>
                </div>
                <NewTask/>
            </div>
        </TaskContext.Provider>
    )
}

export { TaskContext }
