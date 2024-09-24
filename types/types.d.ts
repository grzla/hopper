export type MessageMarkerProps = {
  _id: string
  sponsor: string
  content: string
  location: {
    coordinates: [number, number] // [longitude, latitude]
  }
  createdAt: string
}