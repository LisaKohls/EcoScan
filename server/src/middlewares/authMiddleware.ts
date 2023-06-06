import { NextFunction, Response } from 'express'
import { AuthOptionalRequest } from '../types/authTypes'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import ROLES_LIST from '../config/rolesList'

interface DecodedToken {
  UserInfo: {
    username: string;
    roles: ROLES_LIST[];
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
  // console.log(token);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        res.sendStatus(403) // invalid token
        return
      }
      const decodedToken = decoded as DecodedToken
      /* req.user = {
              user: decodedToken.UserInfo.user,
              roles: decodedToken.UserInfo.roles
          }; */
      req.user = {
        username: decodedToken.UserInfo.username,
        roles: decodedToken.UserInfo.roles
      }
      req.userID = new mongoose.Types.ObjectId() // TODO: real userID
      if (!decodedToken.UserInfo.username || !decodedToken.UserInfo.roles) {
        res.sendStatus(403) // invalid token
        return
      }
      next()
    }
  )
}

export default authMiddleware
