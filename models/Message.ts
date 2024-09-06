import mongoose, { Document, Schema } from 'mongoose'

// Define the interface for the Message document
interface IMessage extends Document {
  content: string
  location: {
    type: 'Point'
    coordinates: [number, number] // [longitude, latitude]
  }
  createdAt: Date
}

// Define the schema for the Message model
const MessageSchema: Schema = new Schema({
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: [500, 'Message content cannot be more than 500 characters']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (coordinates: number[]) => coordinates.length === 2,
        message: 'Coordinates must be in the format [longitude, latitude]'
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Create a geospatial index on the location field
MessageSchema.index({ location: '2dsphere' })

// Create and export the Message model
const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema)

export default Message
