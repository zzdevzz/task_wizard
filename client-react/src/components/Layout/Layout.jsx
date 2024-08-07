import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

// const AuthContext = React.useContext()


export default function Layout(){

    // const [ authenticated, setAuthenticated ] = React.useState(!!localStorage.getItem('token'))
    return (
        <div className="row">
            <div className="col">
                <Header/>
                  <div className="main-content py-3">
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
