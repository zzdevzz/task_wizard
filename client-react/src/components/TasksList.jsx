import React from "react"
import { API_URL } from "../constants"
import { Link } from "react-router-dom"

export default function PostsList() {
    const [tasks, setTasks ] = React.useState([])

    React.useEffect(()=>{
        fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            setTasks(data)
        })
        .then(()=> console.log(tasks))
        // .then(() => console.log(tasks))
    },[])

    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}
                className="post-container">
                    <Link to={`${task.id}`}>                 
                        <h2>{task.name}</h2>
                        <p>{task.description}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}