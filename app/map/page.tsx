'use client'

import { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';
import { GoogleMap, LoadScriptNext, Marker, InfoWindow } from '@react-google-maps/api';
// import dynamic from 'next/dynamic'
// import Map from '@/components/Map'
import { MessageMarkerProps } from '@/types/types'
import { set } from 'mongoose';
import MyLocationIcon from '@mui/icons-material/MyLocation';

/*
const getIconDataUrl = (IconComponent: React.ElementType, color: string = 'primary', size: number = 32) => {
  const iconString = ReactDOMServer.renderToString(
    <IconComponent style={{ color, fontSize: size }} />
  );
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(iconString)}`;
};
*/


const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 41.824,
  lng: -71.4128,
};

/*
const MapComponent = dynamic(() => import('@/components/Map').then(mod => mod.default), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})
*/

const MapPage = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [messages, setMessages] = useState<MessageMarkerProps[]>([])
  const [selectedMessage, setSelectedMessage] = useState<MessageMarkerProps | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fetch user location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );

      // Fetch messages
      fetch('/api/messages')
        .then(response => response.json())
        .then(data => {
          console.log('Messages from endpoint:', data)
          setMessages(data)
        })
        .catch(error => console.error('Error fetching messages:', error));
    }
  }, [])

  const handleMarkerClick = (message: MessageMarkerProps) => {
    setSelectedMessage(message);
  }


  /*
  <div style={{ height: '100vh', width: '100%' }}>
    {userLocation ? (
      <MapComponent 
        center={userLocation} 
        zoom={15} 
        messages={messages} 
      />
    ) : (
      <p>Loading map...</p>
    )}
  </div>
  */

  return (
    <div>

      {!mapLoaded && <p>Loading map...</p>}
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        loadingElement={<div>Loading...</div>}
        onLoad={() => setMapLoaded(true)}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          {mapLoaded && window.google && window.google.maps && messages.map((message) => (
            <Marker
              key={message._id}
              position={{ 
                lat: (message.location.coordinates[1] || 0), 
                lng: (message.location.coordinates[0] || 0) 
              }}
              onClick={() => handleMarkerClick(message)}
              icon={{
                // url: getIconDataUrl(MyLocationIcon),
                url: '/images/icon.png',
                scaledSize: new window.google.maps.Size(32, 32),
              }}
            />
          ))}
          {selectedMessage && (
            <InfoWindow

              position={{ 
                lat: (selectedMessage.location.coordinates[1] || 0), 
                lng: (selectedMessage.location.coordinates[0] || 0)
              }}
              onCloseClick={() => setSelectedMessage(null)}
            >
              <div className='text-slate-800'>
                <h2 className="text-lg">{selectedMessage.content}</h2>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  )
}

export default MapPage;