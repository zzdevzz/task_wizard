import React from "react"
import IMAGES from "../assets/images/Image"

import Signup from "../components/Authorisation/Signup"

export default function Home(){
    return (
        <>  
            <div className="landing-image h-100" style={{paddingTop: -8}}>
                <div className="mt-5 landing-text container text-center h-50 d-flex justify-content-between flex-column">            
                    <h1 className="display-1">Welcome to <strong>TaskWizard</strong></h1>
                    <h2>Don't wait for motivation. Summon it instead.</h2>
                    <Signup className="p-3 mx-auto">Start casting</Signup>
                </div>
            </div>
            {/* <div className="vh-100">
                <h2>Forget your todo list.</h2>
                <h2>Add spells to your motivation spellbook instead.</h2>
                <h2>The perfect way to summon your motivation.</h2>
                <p>- Gandalf</p>
            </div> */}
        </>
    )
}