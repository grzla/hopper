export type MessageMarkerProps = {
  _id: string
  sponsor: string
  content: string
  location: {
    coordinates: [number, number] // [longitude, latitude]
  }
  createdAt: string
}

export type MapLayerProps = {
  _id: string
  name: string
  description: string
  userId: {
    _id: string
    email: string
  }
  locationCoordinates?: number[][]
  googleMapsPlaceId?: string
  gpsCoordinates?: {
    type: 'Polygon'
    coordinates: number[][][]
  }
  likedBy: string[]
}