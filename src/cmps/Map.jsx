// @ts-nocheck

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import React, { useState, useCallback } from 'react'

const containerStyle = {
  width: '100%',
  height: '500px',
}

const mainShop = { lat: 32.08799225694308, lng: 34.860241413116455 }
const seconedShop = { lat: 32.07181093283612, lng: 34.78477478027344 }
const thirdShop = { lat: 32.085447822350176, lng: 34.80369971333909 }
const fourthShop = { lat: 31.776676383760915, lng: 34.664719758509904 }

const allShops = [mainShop, seconedShop, thirdShop, fourthShop]

export function Map({ apiKey }) {
  const [center, setCenter] = useState({ ...mainShop })
  const [zoom, setZoom] = useState(10)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  })

  //   It calculates a bounding box around all your shop locations.
  // It automatically adjusts the zoom and center of the map when it loads so that all your markers are visible — no matter where they are.
  const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds()
    allShops.forEach(pos => bounds.extend(pos))
    map.fitBounds(bounds)
  }, [])

  const getLatLng = ev => {
    const lat = ev.latLng.lat()
    const lng = ev.latLng.lng()
    console.log('Clicked location:', { lat, lng })
  }

  const handleClick = shop => {
    setCenter(shop)
    setZoom(15)
  }

  return isLoaded ? (
    <>
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onClick={getLatLng}
        >
          <Marker position={mainShop} />
          <Marker position={seconedShop} />
          <Marker position={thirdShop} />
          <Marker position={fourthShop} />
        </GoogleMap>
      </div>

      <div className="branches">
        <h2>Our Branches</h2>
        <button onClick={() => handleClick(mainShop)}>Petah Tikva</button>
        <button onClick={() => handleClick(seconedShop)}>Tel Aviv</button>
        <button onClick={() => handleClick(thirdShop)}>Ramat Gan</button>
        <button onClick={() => handleClick(fourthShop)}>Ashdod</button>
      </div>
    </>
  ) : (
    <></>
  )
}
