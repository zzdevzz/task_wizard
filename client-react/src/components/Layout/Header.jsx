import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IMAGES from '../../assets/images/Image'

export default function Header() {
    const navigate = useNavigate()
    const logout = async () => {
        const token = localStorage.getItem('token')

        if (!token) return

        try {
            const response = await fetch('http://localhost:3000/logout', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
              }
            })

            if (response.ok) {
              localStorage.removeItem('token'); // Remove the token from localStorage
              navigate('/login'); // Redirect to the login page
            } else {
              console.error('Logout failed');
            }
          } catch (error) {
            console.error('An error occurred during logout:', error)
          }
        }

    
    return (
        <>
        <img src={IMAGES.wizard} style={{width: 200}}/>
        <nav className='d-flex justify-content-around'>
            <Link to="/">TaskWizard</Link>
            <Link to="/tasks">My tasks</Link>
            {/* <Link to="/categories">My Categories</Link> */}
            <Link to="tasks">New Task</Link>
            <Link to="signup">Sign Up</Link>
            <Link to="login">Login</Link>
            {/* <Link to="logout">Log Out</Link> */}
            <button onClick={logout}>Logout</button>
        </nav>
        </>
    )
}