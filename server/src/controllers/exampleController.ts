import { NextFunction, Request, Response } from 'express'

export const getExample = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'Hello from the example controller!' })
  } catch (err) {
    next(err)
  }
}
