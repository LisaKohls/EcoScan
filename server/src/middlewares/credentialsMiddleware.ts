import { Request, Response, NextFunction } from 'express'
import allowedOrigins from '../config/allowedOrigins'

const credentialsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin as string)) {
    res.header('Access-Control-Allow-Credentials', 'true')
  }
  next()
}

export default credentialsMiddleware
