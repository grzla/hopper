'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MessageMarker from './MessageMarker'
import 'leaflet/dist/leaflet.css'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
// import 'leaflet-defaulticon-compatibility'
import L from 'leaflet'
import IconDefault from 'leaflet'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { renderToString } from 'react-dom/server'
import { MessageMarkerProps } from '@/types/types'

interface MapProps {
  center: [number, number]
  zoom: number
  messages: MessageMarkerProps[]
}

// You'll need to add a default marker icon

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
const customIcon = new L.Icon({
  iconUrl: '@/node_modules/leaflet/src/images/marker.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
})

const Map: React.FC<MapProps> = ({ center, zoom, messages }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {messages.map((message) => (
        <MessageMarker message={message} />
      ))}
    </MapContainer>
  )
}

export default Map
