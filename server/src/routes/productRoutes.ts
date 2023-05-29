import { Router } from 'express'
import { productMiddleware } from '../middlewares/productMiddleware'
import {
  initializeProductDb,
  getProductByBarcode,
  deleteProductByBarcode,
  postProduct,
  patchProduct
} from '../controllers/productController'

export const productRoutes = Router()

productRoutes.post('/init', productMiddleware, initializeProductDb)

productRoutes.get('/:barcode', productMiddleware, getProductByBarcode)

productRoutes.delete('/:barcode', productMiddleware, deleteProductByBarcode)

productRoutes.patch('/:barcode', productMiddleware, patchProduct)

productRoutes.post('', productMiddleware, postProduct)
