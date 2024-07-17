import React from "react"
import { useParams } from "react-router-dom"
import { API_URL } from "../constants"

export default function TaskInfo(props){
    const params = useParams()
    const taskURL = API_URL + "/" + params.id

    const [task, setTask] = React.useState("")

    const fetchTask = async () => {
        try {
            const task = await fetch(taskURL)
            const data = await task.json()
            setTask(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    // React.useEffect(() => {
    //     setTask(fetchTask)
    // }, [])

    React.useEffect(()=>{
        fetchTask()
        console.log(task)
    },[])


    return (
        <>
            <h1></h1>
            <p>{task.name}</p>
        </>
    )
}