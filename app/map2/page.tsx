import React, { useEffect, useState, useContext } from 'react';
import { GoogleMap, LoadScriptNext, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 41.824,
  lng: -71.4128,
};

const Map = () => {
  const { user, claimDeal } = useContext(AuthContext);
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false); // State to track map loading
  const [claimMessage, setClaimMessage] = useState(''); 
  const [isNightMode, setIsNightMode] = useState(true); // State for day/night mode

  useEffect(() => {
    fetch('/deals.json')
      .then((response) => response.json())
      .then((data) => setDeals(data))
      .catch((error) => console.error('Error fetching deals:', error));
  }, []);

  const handleMarkerClick = (deal) => {
    setSelectedDeal(deal);
  };

  const handleClaimDeal = (deal) => {
    if (!user.claimedDeals.some((claimedDeal) => claimedDeal.id === deal.id)) {
      claimDeal(deal);
      setClaimMessage(`You have claimed a deal at ${deal.restaurant}`);
    } else {
      setClaimMessage('You have already claimed this deal.');
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen p-4">

      {!mapLoaded && <p>Loading map...</p>}
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        loadingElement={<div>Loading...</div>}
        onLoad={() => setMapLoaded(true)}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={{ styles: isNightMode ? nightModeStyle : dayModeStyle }}
        >
          {mapLoaded && window.google && window.google.maps && deals.map((deal) => (
            <Marker
              key={deal.id}
              position={{ lat: parseFloat(deal.lat), lng: parseFloat(deal.lng) }}
              onClick={() => handleMarkerClick(deal)}
              icon={{
                url: '/images/nqu_bowl2-removebg-preview.png',
                scaledSize: new window.google.maps.Size(32, 32),
              }}
            />
          ))}
          {selectedDeal && (
            <InfoWindow
              position={{ lat: parseFloat(selectedDeal.lat), lng: parseFloat(selectedDeal.lng) }}
              onCloseClick={() => setSelectedDeal(null)}
            >
              <div className='text-slate-800'>
                <h2 className="text-xl font-bold">{selectedDeal.restaurant}</h2>
                <p className="text-lg">{selectedDeal.deal}</p>
                <p>{selectedDeal.description}</p>
                <p>Cuisine: {selectedDeal.cuisine}</p>
                <p>Time Frame: {selectedDeal.timeFrame}</p>
                <p>Location: {selectedDeal.establishmentDescription}</p>
                <p>Expires: {selectedDeal.expiry}</p>
                <button
                  onClick={() => handleClaimDeal(selectedDeal)}
                  className="mt-2 px-4 py-2 bg-teal-400 text-amber-50 rounded font-bold hover:bg-teal-500 transition duration-300"
                >
                  Claim Voucher
                </button>
                {claimMessage && (
                  <p className="mt-4 text-orange-400 font-bold">{claimMessage}</p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default Map;