import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
// import { withRouter } from 'react-router-dom'
import Geocode from 'react-geocode'

const _key = 'AIzaSyAXQgIkuRMVnmvJsAGvpjmLio18eXm1ERc'

Geocode.setApiKey(_key)

Geocode.setLocationType('ROOFTOP')

const mapStyles = {
  height: '60vh',
  width: '100%',
  marginBottom: '2%'
}

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

  return (
    <LoadScript
      googleMapsApiKey={_key}>
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
