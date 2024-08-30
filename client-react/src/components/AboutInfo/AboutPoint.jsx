import React from "react"

export default function AboutPoint({title, img, text, className}){

    return (
        <div className={`about-point m-3 ${className ? className : ""}`}>
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