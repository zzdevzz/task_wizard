import React from "react"

import { useDocumentTitle } from "../components/customHook/useDocumentTitle"
import Signup from "../components/Authorisation/Signup"
export default function Home(){

    useDocumentTitle("Home")

    return (
        <div className="landing-image h-100 d-flex align-items-center">
            <div className="landing-text container text-center h-75 d-flex flex-column justify-content-between">    
                <div className="welcome-text taskwizard-font">
                    <h2 className="small">Welcome to</h2>
                    <h1>TaskWizard</h1>
                </div>        

                <div>
                    <h3 className="mb-3">Don't wait for motivation. Summon it instead.</h3>
                    <Signup className="p-3 mx-auto">Start casting</Signup>
                </div>
            </div>
        </div>
    )
}