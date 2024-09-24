import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Message from '@/models/Message'
import { MessageMarkerProps } from '@/types/types'

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

export async function POST(request: Request) {
  await connectDB()

  try {
    const { sponsor, message, latitude, longitude } = await request.json()

    // Log the received data
    console.log('Received data:', { sponsor, message, latitude, longitude })

    // Validate input
    if (!message || !latitude || !longitude) {
      console.error('Validation error: Missing required fields', { message, latitude, longitude })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create new message
    const newMessage = new Message({
      sponsor: sponsor,
      content: message,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
    })

    // Save message to database
    await newMessage.save()

    return NextResponse.json({ success: true, message: 'Message saved successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error saving message:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  await connectDB()

  try {
    const messages = await Message.find({})
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
