import { Router } from 'express'
import { getExample } from '../controllers/exampleController'
import { exampleMiddleware } from '../middlewares/exampleMiddleware'

export const exampleRoutes = Router()

exampleRoutes.get('/', exampleMiddleware, getExample)
