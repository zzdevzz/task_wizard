import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav>
            <Link to="/">TaskWizard</Link>
            <Link to="/tasks">My tasks</Link>
            <Link to="/categories">My Categories</Link>
            <Link to="/categories">New Task</Link>
            <Link to="formtest">Form Test</Link>
        </nav>
    )
}