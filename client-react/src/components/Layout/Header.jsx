import React from 'react'
import { Link } from 'react-router-dom'
import IMAGES from '../../assets/images/Image'

export default function Header() {
    return (
        <>
        <img src={IMAGES.wizard} style={{width: 200}}/>
        <nav className='d-flex justify-content-around'>
            <Link to="/">TaskWizard</Link>
            <Link to="/tasks">My tasks</Link>
            {/* <Link to="/categories">My Categories</Link> */}
            <Link to="tasks">New Task</Link>
            <Link to="signup">Sign Up</Link>
            <Link to="">Login</Link>
        </nav>
        </>
    )
}