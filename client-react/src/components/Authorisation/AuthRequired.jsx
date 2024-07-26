import React from "react"
import { Navigate, Outlet } from "react-router-dom"

import { AuthContext } from "./AuthProvider"

export default function AuthRequired(){
    const {isAuthenticated } = React.useContext(AuthContext)
    return isAuthenticated ? <Outlet/> : <Navigate to="login"/>

}

