import express = require('express');
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes'
import { logger } from './middlewares/logEvents'
import { productRoutes } from './routes/productRoutes'
import { NextFunction, Request, Response } from 'express'

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.production' })
} else {
  dotenv.config({ path: './.env.development' })
}

const app = express()

// custom middleware logger
app.use(logger)

// Cross Origin Resource Sharing
app.use(cors(/* corsOptions */))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
console.log(`${process.env.MONGODB_URI}`)

// Internal server Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500)
  res.json({ message: 'InternalServerError' })
  console.log(err)
})

// Middleware after all routes
app.use((req: Request, res: Response) => {
  res.status(404)
  res.json({ message: 'Not found' })
})

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log('Connected to MongoDB.')
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(error => console.error('Error connecting to MongoDB:', error))

export default app
