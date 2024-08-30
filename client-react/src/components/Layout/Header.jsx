import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Authorisation/AuthProvider'

import { Navbar, Nav, Container } from 'react-bootstrap';

import BRAND from '../../assets/brand/brand'

import { base } from '../../utils/api'

export default function Header() {
    const navigate = useNavigate()
    const {isAuthenticated, token, logout} = React.useContext(AuthContext)

    const [expanded, setExpanded] = React.useState(false)


    const signOut = () => {
        if (!token) return

        logout()
        setExpanded(false)
      }

    return (
      <Navbar expand="md" className='layout-stroke-bottom' expanded={expanded}>
        <Container fluid className='mx-3'>
        <Navbar.Brand href="/" className='d-flex align-items-center'>
            <img
              alt=""
              src={BRAND.logo}
              width="40"
              height="40"
              className="d-inline-block align-top me-1"
            />
            <h3 className='mb-0 mt-2 ms-1 taskwizard-font'>Task Wizard</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-icon' onClick={() => setExpanded(!expanded)}/>
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav className="navbar-align">
              <Nav.Link as={NavLink} onClick={() => setExpanded(false)} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} onClick={() => setExpanded(false)} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} onClick={() => setExpanded(false)} to="/tasks">Tasks</Nav.Link>
              {isAuthenticated ? (
                 <a onClick={signOut} className="btn btn-outline-warning navbar-button">
                 Logout
               </a>
              ) : (
                <>
                  <NavLink to="/signup" onClick={() => setExpanded(false)} className='btn btn-outline-info navbar-button'>Sign Up</NavLink>
                  <NavLink to="/login" onClick={() => setExpanded(false)} className='btn btn-outline-primary navbar-button'>Login</NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
