'use client';

import { useState, useEffect } from 'react';
import { MapLayerProps } from '@/types/types';

const ProfilePage = () => {
  const [userMapLayers, setUserMapLayers] = useState<MapLayerProps[]>([]);

  useEffect(() => {
    // Fetch user's map layers
    fetch('/api/map-layers/user')
      .then(response => response.json())
      .then(data => setUserMapLayers(data))
      .catch(error => console.error('Error fetching user map layers:', error));
  }, []);

  const handleEdit = (mapLayerId: string) => {
    // Redirect to the edit page for the selected map layer
    // You can use Next.js routing to navigate to the edit page
    // Example: router.push(`/map-layers/${mapLayerId}/edit`);
  };

  const handleDelete = async (mapLayerId: string) => {
    try {
      const response = await fetch(`/api/map-layers/${mapLayerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh user's map layers
        fetch('/api/map-layers/user')
          .then(response => response.json())
          .then(data => setUserMapLayers(data))
          .catch(error => console.error('Error fetching user map layers:', error));
      } else {
        console.error('Error deleting map layer');
      }
    } catch (error) {
      console.error('Error deleting map layer:', error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div className="map-layers">
        <h2>My Map Layers</h2>
        {userMapLayers.map((layer) => (
          <div key={layer._id} className="map-layer">
            <h3>{layer.name}</h3>
            <p>{layer.description}</p>
            <button onClick={() => handleEdit(layer._id)}>Edit</button>
            <button onClick={() => handleDelete(layer._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage; 