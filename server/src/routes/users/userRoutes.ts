import { Router } from 'express'
import { AuthedFileRequest, AuthRequest } from '../../types/authTypes'
import {
  getOwnUser,
  getProfilePicture,
  saveProfilePicture
} from '../../controllers/users/usersController'
import multer from 'multer'

export const userRoutes = Router()

userRoutes.get('/me', (req, res, next) =>
  getOwnUser(req as AuthRequest, res, next)
)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req: AuthedFileRequest, file, cb) {
    if (req.user && req.user.username) {
      cb(null, `${req.user.username}.jpeg`)
    } else {
      cb(new Error('Invalid user data'), '')
    }
  }
})

const upload = multer({ storage })

userRoutes.post(
  '/me/profile-picture',
  upload.single('profilePicture'),
  (req, res, next) => saveProfilePicture(req as AuthedFileRequest, res, next)
)

userRoutes.get('/me/profile-picture', (req, res, next) =>
  getProfilePicture(req as AuthRequest, res, next)
)
