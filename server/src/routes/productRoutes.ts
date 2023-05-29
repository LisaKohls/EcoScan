import { Router } from 'express'
import { productMiddleware } from '../middlewares/productMiddleware'
import {
  initializeProductDb,
  getProductByBarcode,
  postProduct
} from '../controllers/productController'

export const productRoutes = Router()

productRoutes.post('/init', productMiddleware, initializeProductDb)

productRoutes.get('/:barcode', productMiddleware, getProductByBarcode)

productRoutes.post('', productMiddleware, postProduct)
