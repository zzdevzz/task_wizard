import React from "react";
import { Link } from "react-router-dom";

export default function NewTask(){
    return (
        <Link className="create-task" to="new">+</Link>
    )
}