import express = require('express');
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRoutes from './routes/auth/authRoutes'
import { logger } from './middlewares/logMiddleware'
import { productRoutes } from './routes/products/productRoutes'
import { favoriteRoutes } from './routes/favorites/favoriteRoutes'
import authMiddleware from './middlewares/authMiddleware'
import credentialsMiddleware from './middlewares/credentialsMiddleware'
import corsOptions from './config/corsOptions'
import {
  internalErrorMiddleware,
  lastRouteMiddleware
} from './middlewares/errorMiddleware'
import { userRoutes } from './routes/users/userRoutes'
import { prePopulateDataToDB } from './services/database/databasePrepopService'
import { personalProductRoutes } from './routes/products/personalProductRoutes'
import { bothProducts } from './routes/products/bothProductRoutes'

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.production' })
} else {
  dotenv.config({ path: './.env.development' })
}

const app = express()

// custom middleware logger
app.use(logger)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentialsMiddleware)

// Cross-Origin Resource Sharing
app.use(cors(corsOptions))

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// Built-in middleware for JSON
app.use(express.json())

// Middleware for cookies
app.use(cookieParser())

// NOT Authed Routes
app.use('/api/auth', authRoutes)

// Check auth
app.use(authMiddleware)

// Authed Routes
app.use('/api/products/greendb', productRoutes)
app.use('/api/products/personal', personalProductRoutes)
app.use('/api/products', bothProducts)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/users', userRoutes)

// Internal server Middleware
app.use(internalErrorMiddleware)

// Middleware after all routes
app.use(lastRouteMiddleware)

const fs = require('fs')
const path = require('path')

// Resolve the absolute path to your uploads directory
const uploadsDir = path.resolve(process.cwd(), 'uploads')

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log('Connected to MongoDB.')
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .then(() => {
    prePopulateDataToDB()
  })
  .catch(error => console.error('Error connecting to MongoDB:', error))

export default app
