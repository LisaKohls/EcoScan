import { Router } from 'express'
import {
  getProductByBarcode,
  deleteProductByBarcode,
  postProduct,
  patchProduct,
  getProductsFilteredByName
} from '../controllers/productController'

export const productRoutes = Router()

productRoutes.get('/:barcode', getProductByBarcode)

productRoutes.delete('/:barcode', deleteProductByBarcode)

productRoutes.patch('/:barcode', patchProduct)

productRoutes.get('', getProductsFilteredByName)

productRoutes.post('', postProduct)
