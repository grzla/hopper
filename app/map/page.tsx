'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false })

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude])
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  }, [])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {userLocation ? (
        <MapComponent center={userLocation} zoom={15} />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  )
}
