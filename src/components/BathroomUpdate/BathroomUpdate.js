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
          heading: 'Showing Bathroom Successfully',
          variant: 'success',
          message: 'You can now edit the bathroom.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Showing Bathroom Failed',
          variant: 'danger',
          message: 'Bathroom is not displayed due to error: ' + err.message
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
          heading: 'Updated Bathroom Successfully',
          variant: 'success',
          message: 'Bathroom has been updated.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Updating Bathroom Failed',
          variant: 'danger',
          message: 'Bathroom was not updated due to error: ' + err.message
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
        <h3>Edit Bathroom</h3>
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
