import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import userModel from '../../models/userModel'

interface NewUserRequestBody {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// Regex pattern for email validation
const emailRegex = /^\S+@\S+\.\S+$/

const handleNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let { username, password, email, firstName, lastName } =
    req.body as NewUserRequestBody

  // Trim spaces
  username = username.trim()
  password = password.trim()
  email = email.trim()
  if (firstName) firstName = firstName.trim()
  if (lastName) lastName = lastName.trim()

  if (!username || username.length < 3 || username.length > 20) {
    res
      .status(400)
      .json({
        message:
          'Username is required and should be between 3 and 20 characters long.'
      })
    return
  }

  if (!password || password.length < 3 || password.length > 20) {
    res
      .status(400)
      .json({
        message:
          'Password is required and should be between 3 and 20 characters long.'
      })
    return
  }

  if (!email || !emailRegex.test(email)) {
    res
      .status(400)
      .json({ message: 'Email is required and should be in a valid format.' })
    return
  }

  const duplicate = await userModel.findOne({ username }).exec()
  if (duplicate) {
    res.sendStatus(409)
    return
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 10)
    /* const result = */ await userModel.create({
      username,
      password: hashedPwd,
      email,
      firstName,
      lastName
    })

    res.status(201).json({ success: `New user ${username} created!` })
  } catch (error) {
    next(error)
  }
}

export default handleNewUser
