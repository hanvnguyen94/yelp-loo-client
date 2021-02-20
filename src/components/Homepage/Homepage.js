import React, { Fragment } from 'react'

const authenticatedUser = (
  <div className='homepage px-3' style={{ textAlign: 'center', paddingTop: '30vh' }}>
    <h1>Welcome Back!</h1>
    <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad pariatur quidem nobis distinctio minus a voluptas!<br /> Deserunt, amet hic explicabo numquam vitae nesciunt? Repellendus, iste tempora est eum dolorum ullam.</p>
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
