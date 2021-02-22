import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, withRouter } from 'react-router-dom'

import { bathroomShow, bathroomUpdate } from '../../api/bathroom'

import BathroomForm from '../BathroomForm/BathroomForm'

class BathroomUpdate extends Component {
  constructor () {
    super()

    this.state = {
      bathroom: null,
      updated: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    bathroomShow(match.params.id, user)
      .then(res => this.setState({ bathroom: res.data.bathroom }))
      .then(() => {
        msgAlert({
          heading: 'Showing Loo Successfully',
          variant: 'secondary',
          message: 'You can now edit the loo.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Showing Loo Failed',
          variant: 'danger',
          message: 'Loo is not displayed due to error: ' + err.message
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { bathroom } = this.state

    bathroomUpdate(match.params.id, bathroom, user)
      .then(res => this.setState({ updated: true }))
      .then(() => {
        msgAlert({
          heading: 'Updated Loo Successfully',
          variant: 'secondary',
          message: 'Loo has been updated.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Updating Loo Failed',
          variant: 'danger',
          message: 'Loo was not updated due to error: ' + err.message
        })
      })
  }

  // same handleChange from BathroomCreate
  handleChange = event => {
    this.setState({ bathroom: { ...this.state.bathroom, [event.target.name]: event.target.value } })
  }

  render () {
    const { bathroom, updated } = this.state

    // if we don't have a bathroom yet
    if (!bathroom) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the bathroom is deleted
    if (updated) {
      // redirect to the bathrooms index page
      return <Redirect to={`/bathrooms/${this.props.match.params.id}/`} />
    }

    return (
      <div>
        <h1 className='text-center'>Edit This Loo</h1>
        <BathroomForm
          bathroom={bathroom}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withRouter(BathroomUpdate)
