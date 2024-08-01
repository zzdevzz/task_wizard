import React from "react"
import IMAGES from "../assets/images/Image"

export default function Home(){
    return (
        <div className="mt-5">
            <h1>Welcome to TaskWizard!</h1>
            <h2>The easiest way to manage all your needs,</h2>
            <h2>And get them done on time!</h2>
            <div>
                <div>
                    <img src={IMAGES.wizardLanding} width={100}/>
                </div>
                <h2>Don't wait  to be motivated. Create your own motivation.</h2>
            </div>
        </div>
    )
}