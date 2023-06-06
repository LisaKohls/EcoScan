import { Request } from 'express'
import mongoose from 'mongoose'
import ROLES_LIST from '../config/rolesList'

export interface UserInfo {
  username: string;
  roles: ROLES_LIST[];
}

export interface AuthOptionalRequest extends Request {
  user?: UserInfo;
  userID?: mongoose.Types.ObjectId;
}

export interface AuthRequest extends Request {
  user: UserInfo;
  userID: mongoose.Types.ObjectId;
}
