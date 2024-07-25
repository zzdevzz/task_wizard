import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function AuthRequired(){
    const authenticated = !!localStorage.getItem('token')

    return authenticated? <Outlet/> : <Navigate to="login"/>

}