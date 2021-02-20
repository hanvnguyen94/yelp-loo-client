import React, { Fragment } from 'react'

const authenticatedUser = (
  <div className='homepage px-3' style={{ textAlign: 'center', paddingTop: '30vh' }}>
    <h1>YelpLoo 🧻</h1>
    <h2>The best place to manage your lovely loos</h2>
  </div>
)

const unauthenticatedUser = (
  <div className='homepage px-3' style={{ textAlign: 'center', paddingTop: '30vh' }}>
    <h1>Welcome to YelpLoo, Stranger! 😁</h1>
  </div>
)

const Homepage = ({ user }) => (
  <Fragment>
    { user ? authenticatedUser : unauthenticatedUser }
  </Fragment>
)

export default Homepage
