import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import IMAGES from '../../assets/images/Image'
import { AuthContext } from '../Authorisation/AuthProvider'

export default function Header() {
    const navigate = useNavigate()
    const {isAuthenticated, token, logout, login} = (React.useContext(AuthContext))

    const signOut = async () => {

        if (!token) return

        try {
            const response = await fetch('http://localhost:3000/logout', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
              }
            })
            console.log(response)
            if (response.ok) {
              logout()
              // localStorage.removeItem('token'); // Remove the token from localStorage
              navigate('/login'); // Redirect to the login page
            } else {
              console.error('Logout failed');
            }
          } catch (error) {
            console.error('An error occurred during logout:', error)
          }
        }

    // Active styling in App.css for Navbar active class.
    return (
        <>
        <img src={IMAGES.wizard} style={{width: 100}}/>
        <nav className='d-flex justify-content-around align-items-center m-3 bg-light navbar'>
            <NavLink to="/">TaskWizard</NavLink>
            <NavLink to="/tasks">My tasks</NavLink>
            <NavLink to="tasks">New Task</NavLink>
            {!isAuthenticated && <NavLink to="signup">Sign Up</NavLink>}
            { isAuthenticated ?
              <button onClick={signOut}>Logout</button> : 
              <NavLink to="login">Login</NavLink>
            }
        </nav>
        </>
    )
}