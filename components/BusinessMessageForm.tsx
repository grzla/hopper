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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          address,
          showWithinMiles,
          miles,
          showToUsers,
          times,
          sponsor,
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
