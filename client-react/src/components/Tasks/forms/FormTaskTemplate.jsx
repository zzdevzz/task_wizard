import React from "react"
import { appendErrors, useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"

import { TaskContext } from "../TasksDashboard"

export default function FormTask({method, deleteMethod}){

    const { additionalInfo, setAdditionalInfo, selectedTask:data, closeModal } = React.useContext(TaskContext)

    // Even though component re-renders, data wont change unless form is reset with default values.

    const [isMobile, setIsMobile] = React.useState(window.matchMedia("(max-width: 992px)").matches);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleMediaChange = (event) => {
        setIsMobile(event.matches);
        };

        // Attach listener
        mediaQuery.addEventListener("change", handleMediaChange);

        // Clean up the event listener on component unmount
        return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
        };
    }, []);


    const [buttonText, setButtonText] = React.useState("Create")
    const currentDate = new Date().toISOString().split("T")[0]


    function moreInfo(){
        setAdditionalInfo(prevAdditionalInfo => !prevAdditionalInfo)
    }

    React.useEffect(() => {
        if (method.name === "updateTask" || method.name === "patch"){
            setButtonText("Update")
            reset(data)
        } else if (method.name === "createTask" | method.name === "post") {
            reset()
        } else{
            reset(data)
        }
    },[data])



    // Base form used  to both create and edit a task. We take the post / patch request as a prop as well as default values if they exist.


    const {register, handleSubmit, reset, formState: { errors }} = useForm({defaultValues: data})

    const formatToDateTime = (dateString) => {
        if (!dateString) return null
        return new Date(dateString).toISOString()
    }

    const onSubmit = (formData) => {
        if (!formData.date_created || isNaN(new Date(formData.date_created).getTime())) {
            formData.date_created = new Date().toISOString();  // Set current date if invalid or missing
        } else {
            formData.date_created = new Date(formData.date_created).toISOString();
        }
    
        if (!formData.date_completed_by || isNaN(new Date(formData.date_completed_by).getTime())) {
            formData.date_completed_by = new Date().toISOString();  // Set current date if invalid or missing
        } else {
            formData.date_completed_by = new Date(formData.date_completed_by).toISOString();
        }
        console.log(formData)
        method(formData)
        closeModal()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-100 dark-form-input">
                <div className="d-flex justify-content-start additional-info-buttons">
                    { isMobile ? 
                        <p className="mb-2 badge rounded-pill text-bg-info" onClick={closeModal}>Close</p>
                        : <h2>Task Info</h2>
                    }
                </div>
                <div>
                    <label htmlFor="name" className="form-label">Task Name</label>
                    <input id="name" className="form-control"{...register("name", { required: "Task name is required" })} placeholder="I need to..." />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className="overflow-auto">
                    <label htmlFor="description">Task Description</label>
                    <textarea id="description" className="form-control overflow-auto" {...register("description")} rows="3"
                    style={{ resize: 'vertical', maxHeight: '200px', overflowY: 'auto' }}
                    placeholder="Don't forget for this I need..." />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>

                <AnimatePresence> 
                    {additionalInfo && (
                    <motion.div
                    // initial={{ height: 0, opacity: 0 }}
                    // animate={{ height: 'auto', opacity: 1 }}
                    // exit={{ height: 0, opacity: 0 }}
                    // transition={{ duration: 0.2 }}
                    className="extra-detail-section"
                    >
                        <div className="d-flex">
                        <div className="w-100 me-2">
                            <label htmlFor="priority" className="form-label">Priority</label>
                            <select id="priority" className="form-control" {...register("priority", { required: "Priority is required" })}>
                            <option value="background">Background</option>
                            <option value="normal">Normal</option>
                            <option value="urgent">Urgent</option>
                            </select>
                            {errors.priority && <span>{errors.priority.message}</span>}
                        </div>
                        <div className="w-100">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select id="status" className="form-control"{...register("status", { required: "Status is required" })}>
                            <option value="to_be_done">To Be Done</option>
                            <option value="in_progress">In Progress</option>
                            <option value="to_be_reviewed">To Be Reviewed</option>
                            </select>
                            {errors.status && <span>{errors.status.message}</span>}
                        </div>
                        </div>
                        <div className="d-flex gap-10">
                            <div className="flex-fill mx-auto">
                                <label htmlFor="date_created" className="form-label">Date Created</label>
                                <input id="date_created" type="date" className="form-control" defaultValue={currentDate} {...register("date_created")} readOnly />
                            </div>
                            <div className="flex-fill mx-auto">
                                <label htmlFor="date_completed_by" className="form-label">Complete By</label>
                                <input id="date_completed_by" type="date" className="form-control" defaultValue={currentDate}{...register("date_completed_by")} />
                            </div>
                        </div>
                    </motion.div>)}
                </AnimatePresence>
                <div className="my-3 collapse">
                    <label htmlFor="completed">Done?</label>
                    <input id="completed" type="checkbox" className="d-block"{...register("completed")} />
                </div>
                <div className={`mt-3 ${buttonText === "Update" ? "d-flex gap-10" : ""}`}>
                    <div className="flex-fill mx-auto">
                        <button type="submit" className="base-button-purple w-100 bg-brand-blue mt-2">{buttonText}</button>
                    </div>
                    <div className="flex-fill mx-auto">
                        { buttonText === "Update" && <button onClick={deleteMethod} className="base-button-red w-100 mt-2">{ data.status === "to_be_reviewed" ? "Remove" : "Delete"}</button>}
                    </div>
                </div>
            </form>
        </>
    )
}
