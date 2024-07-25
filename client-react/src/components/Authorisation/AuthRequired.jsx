import React from "react"
import { Navigate, Outlet } from "react-router-dom"

import { AuthContext } from "./AuthProvider"

export default function AuthRequired(){
    const {0: authenticated } = React.useContext(AuthContext)



    return authenticated? <Outlet/> : <Navigate to="login"/>

}

