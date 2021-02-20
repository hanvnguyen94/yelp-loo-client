
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback } from 'react'
// import { render } from 'react-dom'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const _MAPBOX_TOKEN =
  'pk.eyJ1IjoiaGFudm5ndXllbjk0IiwiYSI6ImNrbDh0ZTd0OTAxOGUyd3BmbTFnbzJ3ZXoifQ.JspaZ6qrBw-jf99Ez1fiXQ'

const MapBoxContainer = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  })
  const mapRef = useRef()
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  )

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 }

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      })
    },
    [handleViewportChange]
  )

  return (
    <div style={{ height: '100vh', marginBottom: '3%' }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={_MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={_MAPBOX_TOKEN}
          position="top-left"
        />
      </MapGL>
    </div>
  )
}

export default MapBoxContainer
