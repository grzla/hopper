'use client'

import React, { useState } from 'react'

interface BusinessMessageFormProps {
  onSubmitSuccess: () => void;
  onSubmitError: (error: string) => void;
}

const BusinessMessageForm = ({ onSubmitSuccess, onSubmitError }: BusinessMessageFormProps) => {
  const [message, setMessage] = useState('')
  const [address, setAddress] = useState('')
  const [showWithinMiles, setShowWithinMiles] = useState(false)
  const [miles, setMiles] = useState('')
  const [showToUsers, setShowToUsers] = useState(false)
  const [times, setTimes] = useState('')
  const [sponsor, setSponsor] = useState('')

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

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sponsor,
          message,
          latitude: lat,
          longitude: lng
          // showWithinMiles,
          // miles,
          // showToUsers,
          // times,
        }),
      })

      if (response.ok) {
        onSubmitSuccess()
        setMessage('')
        setAddress('')
        setShowWithinMiles(false)
        setMiles('')
        setShowToUsers(false)
        setTimes('')
        setSponsor('')
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
        <label htmlFor="sponsor" className="block mb-2">Sponsor:</label>
        <input
          id="sponsor"
          value={sponsor}
          onChange={(e) => setSponsor(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="address" className="block mb-2">Address:</label>
        <input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {/* Other fields */}
      <button type="submit" className="px-4 py-2 bg-hey-red text-white rounded hover:bg-hey-red">
        Submit Message
      </button>
    </form>
  )
}

export default BusinessMessageForm
