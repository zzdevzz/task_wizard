import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

// const AuthContext = React.useContext()


export default function Layout(){

    // const [ authenticated, setAuthenticated ] = React.useState(!!localStorage.getItem('token'))
    return (
        <div className="row overflow-auto">
            <div className="col overflow-auto">
                <Header/>
                    <div className="container main-content">
                        <Outlet/>
                    </div>
                <Footer/>
            </div>
        </div>
    )
}

// export { AuthContext }
