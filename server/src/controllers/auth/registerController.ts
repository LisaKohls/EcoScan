import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import ROLES_LIST from '../../config/rolesList'
import userModel from '../../models/userModel'

interface NewUserRequestBody {
  username: string;
  password: string;
  roles: ROLES_LIST[];
  email: string;
  firstName?: string;
  lastName?: string;
}

const handleNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, roles, email, firstName, lastName } =
    req.body as NewUserRequestBody

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required.' })
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
      roles,
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
