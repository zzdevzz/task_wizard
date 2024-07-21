import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"


export default function Layout(){
    return (
        <div className="container" style={{width: 1000}}>
            <div className="row">
                <div className="col">
                <Header/>
                    <Outlet/>
                <Footer/>
                </div>
            </div>
        </div>
    )
}