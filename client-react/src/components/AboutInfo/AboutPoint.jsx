import React from "react"

export default function AboutPoint({title, img, text}){

    return (
        <div className="about-point">
            <img src={img}/>
            <div  className="about-text">
                <h2>
                    {title}
                </h2>
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}