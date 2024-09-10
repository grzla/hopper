'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Map from '@/components/Map'
import { MessageMarkerProps } from '@/types/types'
// const MapComponent = dynamic(() => import('@/components/Map').then(mod => mod.default), {
//   ssr: false,
//   loading: () => <p>Loading map...</p>,
// })

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>([0,0])
  const [messages, setMessages] = useState<MessageMarkerProps[]>([])

  useEffect(() => {
    // Check if geolocation is available
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    // Fetch user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error getting location:', error);
        // Optionally set a default location or handle the error
      }
    );

    // Fetch messages
    fetch('/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, [])
  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {userLocation ? (
        <Map 
          center={userLocation} 
          zoom={15} 
          messages={messages} 
        />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  )
}
