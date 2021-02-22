import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// Bathroom components
import BathroomIndex from './components/BathroomIndex/BathroomIndex'
import BathroomCreate from './components/BathroomCreate/BathroomCreate'
import BathroomShow from './components/BathroomShow/BathroomShow'
import BathroomUpdate from './components/BathroomUpdate/BathroomUpdate'

// MapBox components
// import MapBoxContainer from './components/MapBox/MapBox'
import Homepage from './components/Homepage/Homepage'

import Footer from './components/Footer/Footer'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <section className="d-flex flex-column mb-auto">
          <main className="container mt-5">
            <Route path='/sign-up' render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <Route path='/sign-in' render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-pw' render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )} />

            {/* Show all bathrooms */}
            <Route exact path='/' user={user} render={() => (
              <Homepage user={user} />
            )} />
            <AuthenticatedRoute user={user} exact path='/bathrooms' render={() => (
              <div style={{ minHeight: '78vh' }}>
                <h2 className='text-center mb-3' style={{ marginBottom: '2%' }}>You Can Search Your Loo Location Here</h2>
                {/* <MapBoxContainer /> */}
                <BathroomIndex msgAlert={this.msgAlert} user={user} />
              </div>
            )} />

            {/* Create a bathroom */}
            <AuthenticatedRoute user={user} path='/create-bathroom' render={() => (
              <BathroomCreate msgAlert={this.msgAlert} user={user} />
            )} />

            {/* Get a single bathroom | show */}
            <AuthenticatedRoute user={user} exact path='/bathrooms/:id' render={() => (
              <BathroomShow msgAlert={this.msgAlert} user={user} />
            )} />

            {/* Update a single bathroom */}
            <AuthenticatedRoute user={user} path='/bathrooms/:id/edit/' render={() => (
              <BathroomUpdate msgAlert={this.msgAlert} user={user} />
            )} />
          </main>
        </section>
        <Footer />
      </Fragment>
    )
  }
}

export default App
