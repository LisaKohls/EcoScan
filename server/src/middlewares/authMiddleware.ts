import { NextFunction, Response } from 'express'
import { AuthOptionalRequest } from '../types/authTypes'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

interface DecodedToken {
  UserInfo: {
    username: string;
  };
}

const authMiddleware = (
  req: AuthOptionalRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = (req.headers.authorization ||
    req.headers.Authorization) as string
  if (!authHeader?.startsWith('Bearer ')) {
    res.sendStatus(401)
    return
  }
  const token = authHeader.split(' ')[1]

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        res.sendStatus(403) // invalid token
        return
      }
      const decodedToken = decoded as DecodedToken

      req.user = {
        username: decodedToken.UserInfo.username
      }
      req.userID = new mongoose.Types.ObjectId() // TODO: real userID
      if (!decodedToken.UserInfo.username) {
        res.sendStatus(403) // invalid token
        return
      }
      next()
    }
  )
}

export default authMiddleware
