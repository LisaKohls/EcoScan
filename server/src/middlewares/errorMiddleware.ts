import { NextFunction, Request, Response } from 'express'

export const internalErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500)
  res.json({ message: 'InternalServerError' })
  console.log(err)
}

export const lastRouteMiddleware = (req: Request, res: Response) => {
  res.status(404)
  res.json({ message: 'Not found' })
}
