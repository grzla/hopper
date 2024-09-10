export type MessageMarkerProps = {
    message: {
      _id: string
      content: string
      location: {
        coordinates: [number, number] // [longitude, latitude]
      }
      createdAt: string
  }
}