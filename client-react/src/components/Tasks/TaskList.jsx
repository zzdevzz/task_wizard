import React from "react"
import { Link, useLocation } from "react-router-dom"
import TaskPreview from "./TaskPreview"
import { motion, AnimatePresence } from 'framer-motion';

import { TaskContext } from "./TasksDashboard"

export default function TaskList() {

    const {tasks, setSelectedTask } = React.useContext(TaskContext)
    const sortedTasks = [...tasks].sort((a, b) => a.id - b.id)
    const location = useLocation()

    const handleTaskClick = (task) => {
        setSelectedTask(task);  // Update selected task in context
    };

    return (
        <div className="dashboard-list flex-grow-1 custom-scroll h-100">
            <AnimatePresence>

            {sortedTasks.map((task) => (
                <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                >
                    <div 
                        key={task.id}
                        className={`post-container ${location.pathname.includes(`${task.id}`) ? "active" : ""}`}
                        onClick={() => handleTaskClick(task)}
                    >
                        <Link to={`${task.id}`} state={{taskData: task}}>
                            <TaskPreview taskData={task}/>
                        </Link>
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
    )
}
