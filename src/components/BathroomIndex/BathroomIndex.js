import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { bathroomIndex } from '../../api/bathroom'

class BathroomIndex extends Component {
  constructor (props) {
    super(props)
    // keep track of the bathrooms in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      bathrooms: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    bathroomIndex(user)
      .then(res => this.setState({ bathrooms: res.data.bathrooms }))
      .then(() => msgAlert({
        heading: 'Loaded Bathrooms Successfully',
        message: 'All Bathrooms retrieved. Click on one to go to its page.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Bathrooms!',
          message: 'Could not load Bathrooms with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { bathrooms } = this.state
    if (!bathrooms) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    const bathroomsJsx = bathrooms.map(bathroom => (
      <Link to={`/bathrooms/${bathroom.id}`} key={bathroom.id}>
        <div className='card mb-3'>
          <div className='row'>
            <div className='col-md-4'>
              <img className='img-fluid' src={bathroom.photoUrl}></img>
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h5 className='card-title'>{bathroom.name}</h5>
                <p className='card-text'>Description: {bathroom.description}</p>
                <small className='text-muted'>{bathroom.location}</small>
              </div>
            </div>
          </div>
        </div>
      </Link>

    ))
    return (
      <div>
        {bathroomsJsx}
      </div>
    )
  }
}

export default BathroomIndex
