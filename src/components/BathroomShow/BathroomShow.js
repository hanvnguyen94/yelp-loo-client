import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { bathroomShow, bathroomDelete } from '../../api/bathroom'

class BathroomShow extends Component {
  constructor (props) {
    super(props)
    // initially our bathroom state will be null, until it is fetched from the api
    this.state = {
      bathroom: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    // make a request for a single bathroom
    bathroomShow(match.params.id, user)
      // set the bathroom state, to the bathroom we got back in the response's data
      .then(res => this.setState({ bathroom: res.data.bathroom }))
      .then(() => msgAlert({
        heading: 'Showing Bathroom Successfully',
        message: 'The bathroom is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Bathroom Failed',
          message: 'Failed to show bathroom with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  handleDelete = event => {
    const { user, msgAlert, match } = this.props
    // make a delete axios request
    bathroomDelete(match.params.id, user)
      // set the deleted variable to true, to redirect to the bathroom page in render
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted Bathroom Successfully!',
        message: 'Bathroom deleted!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Deleting Bathroom Failed',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { bathroom, deleted } = this.state
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
    if (deleted) {
      // redirect to the bathrooms index page
      return <Redirect to="/bathrooms/" />
    }
    return (
      <div>
        <h3>Name: {bathroom.name}</h3>
        <h4>Photo URL: {bathroom.photoUrl}</h4>
        <h4>Location: {bathroom.location}</h4>
        <h4>Description: {bathroom.description}</h4>
        <button onClick={this.handleDelete}>Delete Bathroom</button>
        <button>
          <Link to={`/bathrooms/${bathroom.id}/edit/`}>Update Bathroom</Link>
        </button>
      </div>
    )
  }
}
export default withRouter(BathroomShow)
