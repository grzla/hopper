import { Marker, Popup } from 'react-leaflet'
import L, { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { renderToString } from 'react-dom/server'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { MessageMarkerProps } from '@/types/types'
// Define the props interface for the MessageMarker component

// Create a custom icon for the marker
const customIcon = new Icon({
  iconUrl: '/images/message-marker.png', // Make sure this image exists in your public folder
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const createMarkerIcon = () => {
  return L.divIcon({
    html: renderToString(
      <LocationOnIcon style={{ color: 'red', fontSize: 40, filter: 'drop-shadow(3px 3px 2px rgba(0,0,0,0.5))' }} />
    ),
    className: 'mui-marker',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  })
}

// Check if the marker is being created correctly

export default function MessageMarker({ message }: {message: MessageMarkerProps } ) {
  if (!message) {
    console.error('Invalid message object:', message);
    return null; // Return nothing if message is undefined or improperly structured
  }
  console.log('Message:', message);
  // Check if message is undefined

  
  const { sponsor, content, location, createdAt } = message
  const [longitude, latitude] = location.coordinates

  return (
    <Marker position={[latitude, longitude]} icon={createMarkerIcon()}>
      <Popup>
        <div>
          <p className="font-bold bg-hey-red mb-2 ">{sponsor}</p>
          <p className="font-bold mb-2">{content}</p>
          <p className="text-sm text-gray-500">
            Posted on: {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </Popup>
    </Marker>
  )
}
