import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        // <nav>
        //     <h1>Test</h1>
        //     <Link>Test</Link>
        // </nav>
        <nav className='mt-5'>
            <Link to="/">TaskWizard</Link>
            <Link to="/tasks">My tasks</Link>
            <Link to="/categories">My Categories</Link>
            <Link to="/categories">New Task</Link>
            <Link to="/formtest">Form Test</Link>
        </nav>
    )
}