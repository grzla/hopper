import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MessageMarker from './MessageMarker'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { renderToString } from 'react-dom/server'
import { MessageMarkerProps } from '@/types/types'

// Define the interface for MapProps
interface MapProps {
  center: [number, number]
  zoom: number
  messages: MessageMarkerProps[]
}

// Create a custom marker icon using MUI's LocationOnIcon
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

// Define the Map component
const Map: React.FC<MapProps> = ({ center, zoom, messages }) => {
  console.log('Messages in Map.tsx:', messages)
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {messages.map((message: MessageMarkerProps, index: number) => (
        message && <MessageMarker key={index} message={message} />
      ))}
    </MapContainer>
  )
}

export default Map
