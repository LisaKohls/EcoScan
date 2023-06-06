import mongoose, { model, Document } from 'mongoose'
import ROLES_LIST from '../config/rolesList'

export interface UserType extends Document {
  username: string;
  password: string;
  roles: ROLES_LIST[];
  refreshToken?: string[];
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: Number, enum: ROLES_LIST, required: true }],
  refreshToken: [String],
  email: { type: String, unique: true, required: true },
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now }
})

export default model<UserType>('User', userSchema)
