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
        <div className="row">
            <div className="col">
                <Header/>
                <div className="main-content pt-2 custom-scroll">
                    {/* Conditionally apply the 'container' class only if it's not the homepage */}
                    <div className={`${noContainer ? "" : "container"} overflow-hidden h-100`}>
                        <Outlet/>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

// export { AuthContext }
