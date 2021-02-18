import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import BathroomForm from '../BathroomForm/BathroomForm'
import { bathroomCreate } from '../../api/bathroom'

class BathroomCreate extends Component {
  constructor (props) {
    super(props)
    // initially our bathroom title and director will be empty until they are filled in
    this.state = {
      bathroom: {
        name: '',
        photoUrl: '',
        location: '',
        description: ''
      },
      // createdId will be null, until we successfully create a bathroom
      createdId: null
    }
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { bathroom } = this.state
    // create a bathroom, pass it the bathroom data and the user for its token
    bathroomCreate(bathroom, user)
      // set the createdId to the id of the bathroom we just created
      // .then(res => this.setState({ createdId: res.data.bathroom._id }))
      .then(res => {
        this.setState({ createdId: res.data.bathroom.id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Bathroom Successfully',
        message: `Bathroom has been created successfully. Now viewing ${res.data.bathroom.name}.`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Bathroom',
          message: 'Could not create Bathroom with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()
    this.setState(state => {
      // return our state changge
      return {
        // set the bathroom state, to what it used to be (...state.bathroom)
        // but replace the property with `name` to its current `value`
        bathroom: { ...state.bathroom, [event.target.name]: event.target.value }
      }
    })
  }
  render () {
    // destructure our bathroom and createdId state
    const { bathroom, createdId } = this.state
    // if the bathroom has been created and we set its id
    if (createdId) {
      // redirect to the bathrooms show page
      return <Redirect to={`/bathrooms/${createdId}`} />
    }
    return (
      <div>
        <h1 className='text-center'>Add New Loo</h1>
        <BathroomForm
          bathroom={bathroom}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}
export default BathroomCreate
