import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Define the props interface for the MessageMarker component
interface MessageMarkerProps {
  message: {
    _id: string
    content: string
    location: {
      coordinates: [number, number] // [longitude, latitude]
    }
    createdAt: string
  }
}

// Create a custom icon for the marker
const customIcon = new Icon({
  iconUrl: '/images/message-marker.png', // Make sure this image exists in your public folder
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export default function MessageMarker({ message }: MessageMarkerProps) {
  const { content, location, createdAt } = message
  const [longitude, latitude] = location.coordinates

  return (
    <Marker position={[latitude, longitude]} icon={customIcon}>
      <Popup>
        <div>
          <p className="font-bold mb-2">{content}</p>
          <p className="text-sm text-gray-500">
            Posted on: {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </Popup>
    </Marker>
  )
}
