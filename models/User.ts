import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  subscribedMapLayers: string[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscribedMapLayers: [{ type: Schema.Types.ObjectId, ref: 'MapLayer' }],
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 