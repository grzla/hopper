import mongoose, { Document, Schema } from 'mongoose';

export interface IMapLayer extends Document {
  name: string;
  description: string;
  userId: string;
  locationCoordinates?: number[][];
  googleMapsPlaceId?: string;
  likedBy: string[];
}

const MapLayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  locationCoordinates: [[Number]],
  googleMapsPlaceId: String,
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.models.MapLayer || mongoose.model<IMapLayer>('MapLayer', MapLayerSchema); 