import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Authorisation/AuthProvider'

import IMAGES from '../../assets/images/Image'
import BRAND from '../../assets/brand/brand'

import { base } from '../../utils/api'
import { API_URL } from '../../constants'

export default function Header() {
    const navigate = useNavigate()
    const {isAuthenticated, token, logout} = React.useContext(AuthContext)


    const signOut = async () => {
        console.log(token)
        if (!token) return

        try {
            const response = await base.delete(`/logout`, {headers: {'Authorization': token}})
            logout()
            navigate("..")
          } catch (error) {
            console.error('An error occurred during logout:', error)
          }
        }

    // Active styling in App.css for Navbar active class.
    return (
      <>
        <nav className='d-flex justify-content-around align-items-center navbar layout-stroke-bottom'>
            <NavLink to="/"><img src={BRAND.logo} style={{width: 50}}/></NavLink>
            <NavLink to="/about" >About</NavLink>
            <NavLink to="/tasks">My tasks</NavLink>
            {!isAuthenticated && <NavLink to="signup">Sign Up</NavLink>}
            { isAuthenticated ?
              // <button onClick={signOut} className='btn btn-outline-warning'>Logout</button> :
              <button onClick={signOut} className='btn btn-warning'>Logout</button> :
              <NavLink to="login">Login</NavLink>
            }
        </nav>
        </>
    )
}
