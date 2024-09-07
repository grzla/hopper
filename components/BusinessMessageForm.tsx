'use client'

import { useState } from 'react'

interface BusinessMessageFormProps {
  onSubmitSuccess: () => void;
  onSubmitError: (error: string) => void;
}

export default function BusinessMessageForm({ onSubmitSuccess, onSubmitError }: BusinessMessageFormProps) {
  const [message, setMessage] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, latitude, longitude }),
      })
      if (response.ok) {
        onSubmitSuccess()
        setMessage('')
        setLatitude('')
        setLongitude('')
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
        <label htmlFor="latitude" className="block mb-2">Latitude:</label>
        <input
          type="number"
          id="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="longitude" className="block mb-2">Longitude:</label>
        <input
          type="number"
          id="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
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
