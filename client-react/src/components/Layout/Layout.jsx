import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout(){

    return (
        <div className="row">
            <div className="col">
                <Header/>
                  <div className="main-content pt-2 custom-scroll">
                    <div className="container">
                        <Outlet/>
                    </div>
                  </div>
                <Footer/>
            </div>
        </div>
    )
}

// export { AuthContext }
