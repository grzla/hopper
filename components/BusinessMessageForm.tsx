'use client'

import { useState } from 'react'

interface BusinessMessageFormProps {
  onSubmitSuccess: () => void;
  onSubmitError: (error: string) => void;
}

export default function BusinessMessageForm({ onSubmitSuccess, onSubmitError }: BusinessMessageFormProps) {
  const [message, setMessage] = useState('')
  const [address, setAddress] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Fetch coordinates from Google's Geocoding API
      const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
      const geocodeData = await geocodeResponse.json()

      if (geocodeData.status !== 'OK') {
        throw new Error('Failed to fetch coordinates')
      }

      const { lat, lng } = geocodeData.results[0].geometry.location

      // Submit the form with the retrieved coordinates
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, latitude: lat, longitude: lng }),
      })

      if (response.ok) {
        onSubmitSuccess()
        setMessage('')
        setAddress('')
      } else {
        throw new Error('Failed to submit message')
      }
    } catch (error) {
      onSubmitError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="message" className="block mb-2">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="address" className="block mb-2">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit Message
      </button>
    </form>
  )
}
