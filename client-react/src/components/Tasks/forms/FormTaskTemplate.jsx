import React from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"

import { TaskContext } from "../TasksDashboard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

export default function FormTaskTemplate({ method, deleteMethod }) {
    const { additionalInfo, setAdditionalInfo, selectedTask: data, closeModal } = React.useContext(TaskContext || {})

    const [isMobile, setIsMobile] = React.useState(window.matchMedia("(max-width: 992px)").matches)

    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 992px)")
        const handleMediaChange = (event) => {
            setIsMobile(event.matches)
        }

        // Attach listener
        mediaQuery.addEventListener("change", handleMediaChange)

        // Clean up the event listener on component unmount
        return () => {
            mediaQuery.removeEventListener("change", handleMediaChange)
        }
    }, [])

    const [buttonText, setButtonText] = React.useState("Create")
    const currentDate = new Date().toISOString().split("T")[0]

    React.useEffect(() => {
        if (method.name === "updateTask" || method.name === "patch") {
            setButtonText("Update")
            reset(data)
        } else if (method.name === "createTask" || method.name === "post") {
            reset()
        } else {
            reset(data)
        }
    }, [data])

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({ defaultValues: data })

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

        // Custom validation: Ensure date_completed_by is not before date_created
        if (new Date(formData.date_completed_by) < new Date(formData.date_created)) {
            return alert("The 'Complete By' date cannot be before the 'Date Created' date.");
        }

        console.log(formData)
        method(formData)
        closeModal()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-100 dark-form-input">
                <div className="d-flex additional-info-buttons">
                    {isMobile ? 
                        <FontAwesomeIcon icon={faCircleXmark} onClick={closeModal} className="ms-auto fs-1 close-form" />
                        : <h2>Task Info</h2>
                    }
                </div>
                <div>
                    <label htmlFor="name" className="form-label">Task Name</label>
                    <input id="name" className="form-control" {...register("name", { required: "Task name is required" })} placeholder="I need to..." />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className="overflow-auto">
                    <label htmlFor="description">Task Description</label>
                    <textarea id="description" className="form-control overflow-auto" {...register("description")} rows="3"
                        style={{ resize: 'vertical', maxHeight: '200px', overflowY: 'auto' }}
                        placeholder="Don't forget for this I need..." />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>
                {additionalInfo && (
                    <div>
                        <div className="d-flex gap-10">
                            <div className="w-100">
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
                                <select id="status" className="form-control" {...register("status", { required: "Status is required" })}>
                                    <option value="to_be_done">To Be Done</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="to_be_reviewed">To Be Reviewed</option>
                                </select>
                                {errors.status && <span>{errors.status.message}</span>}
                            </div>
                        </div>
                        <div className="d-flex flex-wrap gap-10">
                            <div className="flex-fill mx-auto">
                                <label htmlFor="date_created" className="form-label">Date Created</label>
                                <input id="date_created" type="date" className="form-control" defaultValue={currentDate} {...register("date_created")} readOnly />
                            </div>
                            <div className="flex-fill mx-auto">
                                <label htmlFor="date_completed_by" className="form-label">Complete By</label>
                                <input 
                                    id="date_completed_by" 
                                    type="date" 
                                    className="form-control" 
                                    defaultValue={currentDate} 
                                    {...register("date_completed_by", { 
                                        validate: value => {
                                            const dateCreated = getValues('date_created')
                                            return new Date(value) >= new Date(dateCreated) || "Complete By date cannot be before Date Created"
                                        }
                                    })} 
                                />
                                {errors.date_completed_by && <span className="text-danger">{errors.date_completed_by.message}</span>}
                            </div>
                        </div>
                    </div>
                )}
                <div className="my-3 collapse">
                    <label htmlFor="completed">Done?</label>
                    <input id="completed" type="checkbox" className="d-block" {...register("completed")} />
                </div>
                <div className={`mt-3 ${buttonText === "Update" ? "d-flex gap-10" : ""}`}>
                    <div className="flex-fill mx-auto">
                        <button type="submit" className="base-button-purple w-100 bg-brand-blue mt-2">{buttonText}</button>
                    </div>
                    <div className="flex-fill mx-auto">
                        {buttonText === "Update" && <button onClick={deleteMethod} className="base-button-red w-100 mt-2">{data.status === "to_be_reviewed" ? "Remove" : "Delete"}</button>}
                    </div>
                </div>
            </form>
        </>
    )
}
