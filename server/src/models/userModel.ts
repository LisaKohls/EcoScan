import mongoose, { model, Document } from 'mongoose'

export interface UserType extends Document {
  username: string;
  password: string;
  refreshToken: string[];
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  favorites: number[];
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  refreshToken: { type: [String], default: [] },
  email: { type: String, unique: true, required: true },
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
  favorites: [{ type: Number, ref: 'Product' }]
})

export default model<UserType>('User', userSchema)
