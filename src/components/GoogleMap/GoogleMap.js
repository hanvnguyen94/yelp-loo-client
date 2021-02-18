import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { withRouter } from 'react-router-dom'

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
    height: '50vh',
    width: '100%',
    marginBottom: '2%'
  }

  return (
    <LoadScript
      googleMapsApiKey='AIzaSyAXQgIkuRMVnmvJsAGvpjmLio18eXm1ERc'>
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

export default withRouter(MapContainer)
