import React, { useState, useEffect, Component } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
// import { withRouter } from 'react-router-dom'
import Geocode from 'react-geocode'

const GoogleMapKey = 'AIzaSyAXQgIkuRMVnmvJsAGvpjmLio18eXm1ERc'

Geocode.setApiKey(GoogleMapKey)

Geocode.setLocationType('ROOFTOP')

export const MapContainer = () => {
  const [ currentPosition, setCurrentPosition ] = useState({})

  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition)
  }

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setCurrentPosition({ lat, lng })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  })

  const mapStyles = {
    textAlign: 'center',
    height: '60vh',
    width: '100%',
    marginBottom: '2%'
  }

  return (
    <LoadScript
      googleMapsApiKey={GoogleMapKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={currentPosition}>
        {
          currentPosition.lat
            ? <Marker
              position={currentPosition}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              draggable={true} />
            : null
        }
      </GoogleMap>
    </LoadScript>
  )
}

const mapStyles = {
  height: '60vh',
  width: '100%',
  marginBottom: '2%'
}

export default class SecondMapContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: null
    }
  }
  componendDidMount () {
    let lat
    let lng
    Geocode.fromAddress(location).then(
      (response) => {
        lat = response.results[0].geometry.location.lat
        lng = response.results[0].geometry.location.lng
        console.log(lat, lng)
        this.setState({ location: location })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  // const defaultCenter = {
  //   lat: lat, lng: lng
  // }
  render () {
    return (
      <LoadScript
        googleMapsApiKey={GoogleMapKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={{ location }}
        />
      </LoadScript>
    )
  }
}

// export default GoogleMap
