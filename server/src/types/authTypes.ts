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
}

export interface AuthedBarcodeRequest extends Request {
  user: UserInfo;
  params: {
    barcode: string;
  };
}

export interface AuthedFileRequest extends Request {
  user: UserInfo;
  file: any;
}
