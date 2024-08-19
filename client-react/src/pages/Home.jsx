import React from "react"
import IMAGES from "../assets/images/Image"

export default function Home(){
    return (
        <div className="mt-5 landing">
            <h2>Forget your todo list. Add spells to your motivation spellbook.</h2>
            <h1>Welcome to TaskWizard</h1>
            <h2>The perfect way to summon your motivation.</h2>
            <div>
                <div>
                    <img src={IMAGES.wizardLanding} width={100}/>
                </div>
                <h2>Don't wait  to be motivated. Create your own motivation.</h2>
            </div>
        </div>
    )
}