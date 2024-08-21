import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout(){
    const location = useLocation()

    // Check if the current route is the homepage (root path)
    // const isHomePage = location.pathname === "/"

    const noContainer = (() => {
        switch (location.pathname) {
            case "/":
            case "/signup":
            case "/login":
                return true
            default:
                return false
        }
    })()

    return (
        <div className="row h-100">
            <div className="col h-100">
                <Header/>
                <div className="main-content custom-scroll">
                    {/* Conditionally apply the 'container' class only if it's not the homepage */}
                    <div className={`${noContainer ? "" : "container"} h-100 py-2`}>
                        <Outlet/>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

// export { AuthContext }
