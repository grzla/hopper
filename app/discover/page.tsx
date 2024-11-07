'use client';

import { useState, useEffect } from 'react';
import { MapLayerProps } from '@/types/types';

const DiscoverPage = () => {
  const [mapLayers, setMapLayers] = useState<MapLayerProps[]>([]);

  useEffect(() => {
    // Fetch all map layers
    fetch('/api/map-layers')
      .then(response => response.json())
      .then(data => setMapLayers(data))
      .catch(error => console.error('Error fetching map layers:', error));
  }, []);

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
        // Refresh map layers
        fetch('/api/map-layers')
          .then(response => response.json())
          .then(data => setMapLayers(data))
          .catch(error => console.error('Error fetching map layers:', error));
      } else {
        console.error('Error subscribing to map layer');
      }
    } catch (error) {
      console.error('Error subscribing to map layer:', error);
    }
  };

  return (
    <div>
      <h1>Discover Map Layers</h1>
      <div className="map-layers">
        {mapLayers.map((layer) => (
          <div key={layer._id} className="map-layer">
            <h3>{layer.name}</h3>
            <p>{layer.description}</p>
            <p>Created by: {layer.userId.email}</p>
            <button onClick={() => handleSubscribe(layer._id)}>Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage; 