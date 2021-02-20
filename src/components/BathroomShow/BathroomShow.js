import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { bathroomShow, bathroomDelete } from '../../api/bathroom'
// import SecondMapContainer from '../GoogleMap/SecondMap'

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
        heading: 'Showing Loo Successfully',
        message: 'The Loo is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Loo Failed',
          message: 'Failed to show Loo with error: ' + error.message,
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
        heading: 'Deleted Loo Successfully!',
        message: 'Loo deleted!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Deleting Loo Failed',
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
      <div className='row'>
        <div className='col-6 mb-3' style={{ marginLeft: '35%' }}>
          {/* <SecondMapContainer style={{ selfAlign: 'center' }} bathroom={bathroom}/> */}
          <Card style={{ width: '18rem', color: 'black' }}>
            <Card.Img variant="top" src={bathroom.photoUrl}/>
            <Card.Body>
              <Card.Title>{bathroom.name}</Card.Title>
              <Card.Text>
                {bathroom.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem className="text-muted">{bathroom.location}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button className='mr-2' variant="outline-info">
                <Link to={`/bathrooms/${bathroom.id}/edit/`}>Update</Link>
              </Button>
              <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
}
export default withRouter(BathroomShow)
