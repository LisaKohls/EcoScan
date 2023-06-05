import { Router } from 'express'
import {
  initializeProductDb,
  getProductByBarcode,
  deleteProductByBarcode,
  postProduct,
  patchProduct,
  getProductsFilteredByName
} from '../controllers/productController'

export const productRoutes = Router()

productRoutes.post('/init', initializeProductDb)

productRoutes.get('/:barcode', getProductByBarcode)

productRoutes.delete('/:barcode', deleteProductByBarcode)

productRoutes.patch('/:barcode', patchProduct)

productRoutes.get('', getProductsFilteredByName)

productRoutes.post('', postProduct)
