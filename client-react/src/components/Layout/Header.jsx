import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

    
    return (
        <>
        <img src={IMAGES.wizard} style={{width: 200}}/>
        <nav className='d-flex justify-content-around align-items-center my-5 bg-light'>
            <Link to="/">TaskWizard</Link>
            <Link to="/tasks">My tasks</Link>
            <Link to="tasks">New Task</Link>
            {!isAuthenticated && <Link to="signup">Sign Up</Link>}
            { isAuthenticated ?
              <button onClick={signOut}>Logout</button> : 
              <Link to="login">Login</Link>
            }
        </nav>
        </>
    )
}