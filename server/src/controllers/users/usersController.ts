import { NextFunction, Response } from 'express'
import userModel from '../../models/userModel'
import { AuthedFileRequest, AuthRequest } from '../../types/authTypes'
import path from 'path'
import fs from 'fs'

export const getOwnUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findOne({ username: req.user.username })

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    const { email, firstName, lastName, createdAt, username } = user

    res.status(200).json({ email, firstName, lastName, createdAt, username })
  } catch (error) {
    next(error)
  }
}

export const saveProfilePicture = async (
  req: AuthedFileRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ message: 'Profile picture updated successfully' })
  } catch (error) {
    next(error)
  }
}

export const getProfilePicture = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const filePath = path.resolve('uploads', req.user.username + '.jpeg')
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed to load image.' })
    } else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.end(data)
    }
  })
}
