'use client'

import { useState } from 'react'
import BusinessMessageForm from '@/components/BusinessMessageForm'

export default function BusinessPage() {
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)

  const handleSubmitSuccess = () => {
    setSubmitStatus('Message submitted successfully!')
    // Reset the status after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000)
  }

  const handleSubmitError = (error: string) => {
    setSubmitStatus(`Error: ${error}`)
    // Reset the status after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Business Message Portal</h1>
      <BusinessMessageForm onSubmitSuccess={handleSubmitSuccess} onSubmitError={handleSubmitError} />
      {submitStatus && (
        <div className={`mt-4 p-4 rounded ${submitStatus.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {submitStatus}
        </div>
      )}
    </div>
  )
}
