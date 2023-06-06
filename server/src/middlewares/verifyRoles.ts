import { Response, NextFunction } from 'express'
import ROLES_LIST from '../config/rolesList'
import { AuthOptionalRequest } from '../types/authTypes'

const verifyRoles = (...allowedRoles: ROLES_LIST[]) => {
  return (
    req: AuthOptionalRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user?.roles) {
      res.sendStatus(401)
      return
    }
    const result = req.user.roles
      .map(role => allowedRoles.includes(role)) // TODO: rewrite this cleaner that its not necessary to convert to string and than to number
      .find((val: boolean) => val)
    if (!result) {
      res.sendStatus(401)
      return
    }
    next()
  }
}

export default verifyRoles
