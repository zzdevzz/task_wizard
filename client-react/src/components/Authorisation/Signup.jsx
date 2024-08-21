import React from "react"

export default function Signup({children, className = ""}){
    return (
        <a className={`signup-button d-flex align-items-center justify-content-center ${className}`}>
            <p className="mb-0">{children || "Signup"}</p>
        </a>
    )
}