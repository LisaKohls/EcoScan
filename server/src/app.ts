import express = require('express');
import { exampleRoutes } from './routes/exampleRoutes'
import cors from 'cors'
import { MONGODB_URI } from './config/config'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes'
import corsOptions from './config/corsOptions'
import { logger } from './middlewares/logEvents'

const app = express()

// custom middleware logger
app.use(logger)

// Cross Origin Resource Sharing
app.use(cors(/* corsOptions */))
app.use(express.json())
app.use('/api/example', exampleRoutes)
app.use('/api/auth', authRoutes)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB.')
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(error => console.error('Error connecting to MongoDB:', error))

export default app
