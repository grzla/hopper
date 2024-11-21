'use client'

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScriptNext, Marker, InfoWindow } from '@react-google-maps/api';
import { MessageMarkerProps, MapLayerProps } from '@/types/types';

const containerStyle = {
  width: '100%',
  height: '80vh',
};

const MapPage = () => {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [messages, setMessages] = useState<MessageMarkerProps[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageMarkerProps | null>(null);
  const [subscribedMapLayers, setSubscribedMapLayers] = useState<MapLayerProps[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fetch user location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );

      // Fetch messages
      fetch('/api/messages')
        .then(response => response.json())
        .then(data => {
          console.log('Messages from endpoint:', data);
          setMessages(data);
        })
        .catch(error => console.error('Error fetching messages:', error));

      // Fetch subscribed map layers
      fetch('/api/map-layers/subscribed')
        .then(response => response.json())
        .then(data => {
          console.log('Subscribed map layers:', data);
          if (Array.isArray(data)) {
            setSubscribedMapLayers(data);
          } else {
            console.error('Subscribed map layers data is not an array:', data);
          }
        })
        .catch(error => console.error('Error fetching subscribed map layers:', error));
    }
  }, []);

  const handleMarkerClick = (message: MessageMarkerProps) => {
    console.log('Marker clicked:', message)
    setSelectedMessage(message);
  };

  const handleSubscribe = async (mapLayerId: string) => {
    try {
      const response = await fetch('/api/map-layers/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mapLayerId }),
      });

      if (response.ok) {
        // Refresh subscribed map layers
        fetch('/api/map-layers/subscribed')
          .then(response => response.json())
          .then(data => {
            console.log('Subscribed map layers:', data);
            if (Array.isArray(data)) {
              setSubscribedMapLayers(data);
            } else {
              console.error('Subscribed map layers data is not an array:', data);
            }
          })
          .catch(error => console.error('Error fetching subscribed map layers:', error));
      } else {
        console.error('Error subscribing to map layer');
      }
    } catch (error) {
      console.error('Error subscribing to map layer:', error);
    }
  };

  return (
    <div>
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        loadingElement={<div>Loading...</div>}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || undefined}
          zoom={userLocation ? 15 : 10}
        >
          {messages.map((message) => (
            <Marker
              key={message._id}
              position={{
                lat: message.location.coordinates[1] || 0,
                lng: message.location.coordinates[0] || 0,
              }}
              onClick={() => handleMarkerClick(message)}
              icon={{
                url: '/images/icon.png',
                scaledSize: new window.google.maps.Size(32, 32),
              }}
            />
          ))}
          {selectedMessage && (
            <InfoWindow
              position={{
                lat: selectedMessage.location.coordinates[1] || 0,
                lng: selectedMessage.location.coordinates[0] || 0,
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
      <div className="map-layers" style={{zIndex: 1000, position: 'relative'}}>
        <h2>Subscribed Map Layers</h2>
        {subscribedMapLayers.map((layer) => (
          <div key={layer._id} className="map-layer">
            <h3>{layer.name}</h3>
            <p>{layer.description}</p>
            <button onClick={() => handleSubscribe(layer._id)}>
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;