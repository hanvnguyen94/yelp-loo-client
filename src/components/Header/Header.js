import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className='text-white nav-link' href="#bathrooms">Loos</Nav.Link>
    <Nav.Link className='text-white nav-link' href="#create-bathroom">New Loo</Nav.Link>
    <Nav.Link className='text-white nav-link' href="#change-password">Change Password</Nav.Link>
    <Nav.Link className='text-white nav-link' href="#sign-out">Log Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className='text-white nav-link' href="#sign-up">Register</Nav.Link>
    <Nav.Link className='text-white nav-link' href="#sign-in">Log In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link className='text-white nav-link' href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar expand="md">
    <Navbar.Brand className='text-white' href="#">
      YelpLoo
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2 text-white">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
