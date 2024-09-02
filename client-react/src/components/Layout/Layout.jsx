import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout(){
    const location = useLocation()

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
            <div className="col h-100 d-flex flex-column">
                <Header/>
                <div className="main-content custom-scroll flex-grow-1">
                    {/* Conditionally apply the 'container' class only if not in noContainer list */}
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
