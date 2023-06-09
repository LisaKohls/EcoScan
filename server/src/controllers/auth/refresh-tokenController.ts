import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserInfo } from '../../types/authTypes'
import userModel from '../../models/userModel'

const handleRefreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    res.sendStatus(401)
    return
  }
  const refreshToken = cookies.jwt
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })

  const foundUser = await userModel.findOne({ refreshToken }).exec()
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403)
        console.log('attempted refresh token reuse!')
        const hackedUser = await userModel
          .findOne({
            username: decoded.username
          })
          .exec()
        if (hackedUser) {
          hackedUser.refreshToken = []
          await hackedUser.save()
        }
      }
    )
    res.sendStatus(403)
    return
  }

  const newRefreshTokenArray =
    foundUser.refreshToken?.filter(rt => rt !== refreshToken) ?? []

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) {
        console.log('111111111111111111111111111111')
        foundUser.refreshToken = [...newRefreshTokenArray]
        await foundUser.save()
      }

      if (err || foundUser.username !== decoded.username) {
        console.log('RETTTTTTTTTT')
        return res.sendStatus(403)
      }

      const userInfo: UserInfo = {
        username: decoded.username
      }

      const accessToken = jwt.sign(
        { UserInfo: userInfo },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '30min' }
      )

      const newRefreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '8h' }
      )
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
      await foundUser.save()
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
      })

      res.json({ accessToken })
    }
  )
}

export default handleRefreshToken
