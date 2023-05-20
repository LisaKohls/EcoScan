import { Router } from 'express'
import { productMiddleware } from '../middlewares/productMiddleware'
import { initializeProductDb } from '../controllers/productController'

export const productRoutes = Router()

productRoutes.post('/init', productMiddleware, initializeProductDb)
