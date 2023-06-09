import { Request, Response } from 'express'
import userModel from '../../models/userModel'

const handleLogout = async (req: Request, res: Response): Promise<void> => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    res.sendStatus(204)
    return
  }

  const refreshToken = cookies.jwt
  const foundUser = await userModel.findOne({ refreshToken }).exec()

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.sendStatus(204)
    return
  }

  foundUser.refreshToken =
    foundUser.refreshToken?.filter(rt => rt !== refreshToken) ?? []
  /* const result = */ await foundUser.save()

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
  res.sendStatus(204)
}

export default handleLogout
