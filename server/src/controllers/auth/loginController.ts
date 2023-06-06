import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInfo } from '../../types/authTypes'
import userModel from '../../models/userModel'

interface LoginRequestBody {
  username: string;
  password: string;
}

const handleLogin = async (req: Request, res: Response): Promise<void> => {
  // console.log(JSON.stringify(req.body));
  const cookies = req.cookies
  const { username, password } = req.body as LoginRequestBody

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required.' })
    return
  }

  const foundUser = await userModel.findOne({ username }).exec()

  if (!foundUser) {
    res.sendStatus(401) // Unauthorized
    return
  }

  // Evaluate password
  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
    console.log(foundUser)
    const roles = foundUser.roles.filter(Boolean)

    const userInfo: UserInfo = {
      username: foundUser.username,
      roles
    }

    // Create JWTs
    const accessToken = jwt.sign(
      { UserInfo: userInfo },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '30m' }
    )

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '8h' }
    )

    const newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken?.filter(rt => rt !== cookies.jwt) ?? []

    if (cookies?.jwt) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })
    }

    if (newRefreshTokenArray) {
      // Save refreshToken with the current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
      /* const result = */ await foundUser.save()

      // Create Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
      })
    }

    // Send authorization roles and access token to the user
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}

export default handleLogin
