import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
// import { withRouter } from 'react-router-dom'
import Geocode from 'react-geocode'

const _GoogleMapKey = 'AIzaSyAXQgIkuRMVnmvJsAGvpjmLio18eXm1ERc'

const mapStyles = {
  textAlign: 'center',
  height: '60vh',
  width: '100%',
  marginBottom: '2%'
}

export class SecondMapContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lat: null,
      lng: null
    }
  }
  componentDidMount () {
    // console.log('is bathroom here?', this.props.bathroom)
    const { location } = this.props.bathroom
    // console.log('is location here?', location)
    Geocode.fromAddress(location).then(
      (response) => {
        const lat = response.results[0].geometry.location.lat
        const lng = response.results[0].geometry.location.lng
        this.setState(
          { lat: lat, lng: lng }
        )
        console.log('lat state here right?', this.state.lat)
        console.log('long state here right?', this.state.lng)
      },
      (error) => {
        console.error(error)
      }
    )
  }
  render () {
    const { lat, lng } = this.state
    return (
      <LoadScript
        googleMapsApiKey={_GoogleMapKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={{ lat, lng }}
        >
          <Marker
            key={location}
            position={{ lat, lng }}
          />
        /</GoogleMap>
      </LoadScript>
    )
  }
}

// export default GoogleMap
export default SecondMapContainer
