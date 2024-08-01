import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

// const AuthContext = React.useContext()


export default function Layout(){

    // const [ authenticated, setAuthenticated ] = React.useState(!!localStorage.getItem('token'))
    return (
        <div className="container">
            <div className="row">
                <div className="col" style={{position: "relative"}}>
                    {/* <AuthContext.Provider value={[authenticated]}> */}
                        <Header/>
                            <Outlet/>
                        <Footer/>
                    {/* </AuthContext.Provider> */}
                </div>
            </div>
        </div>
    )
}

// export { AuthContext }