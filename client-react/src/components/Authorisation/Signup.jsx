import React from "react"
import { Link } from "react-router-dom"
import { useDocumentTitle } from "../customHook/useDocumentTitle"

export default function Signup({children, className = ""}){
    useDocumentTitle("Sign Up")
    return (
        <Link className={`signup-button d-flex align-items-center justify-content-center ${className}`} to="/tasks">
            <p className="mb-0">{children || "Signup"}</p>
        </Link>
    )
}