import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Authorisation/AuthProvider'

import { Navbar, Nav, Container } from 'react-bootstrap';

import { IMAGES } from '../../assets/images/Image'
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

    return (
      <Navbar expand="md" className='layout-stroke-bottom'>
        <Container fluid className='mx-3'>
        <Navbar.Brand href="/" className='d-flex align-items-center'>
            <img
              alt=""
              src={BRAND.logo}
              width="40"
              height="40"
              className="d-inline-block align-top me-3"
            />
            <h2 className='m-0'>Task Wizard</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-icon'/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/tasks">Tasks</Nav.Link>
              {isAuthenticated ? (
                 <a onClick={logout} className="btn btn-outline-warning navbar-button">
                 Logout
               </a>
              ) : (
                <>
                  <NavLink to="/signup" className='btn btn-outline-info navbar-button'>Sign Up</NavLink>
                  <NavLink to="/login" className='btn btn-outline-primary navbar-button'>Login</NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
