import { Request } from 'express'
import mongoose from 'mongoose'

export interface UserInfo {
  username: string;
}

export interface AuthOptionalRequest extends Request {
  user?: UserInfo;
  userID?: mongoose.Types.ObjectId;
}

export interface AuthRequest extends Request {
  user: UserInfo;
  userID: mongoose.Types.ObjectId;
}
