import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'

const logMiddleware = async (
  message: string,
  logName: string
): Promise<void> => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }

    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logName),
      logItem
    )
  } catch (err) {
    console.log(err)
  }
}

const logger = (req: Request, res: Response, next: NextFunction): void => {
  logMiddleware(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    'reqLog.txt'
  )
  console.log(`${req.method} ${req.path}`)
  next()
}

export { logger, logMiddleware }
