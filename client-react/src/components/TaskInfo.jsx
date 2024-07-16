import React from "react"
import { useParams } from "react-router-dom"

export default function TaskInfo(props){
    const params = useParams()
    console.log("Woo you made it")
    console.log(params)
    return (
        <>
            <h1></h1>
            <p>{props}</p>
        </>
    )
}