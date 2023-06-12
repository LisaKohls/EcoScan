import { Router } from 'express'
import {
  getProductByBarcode,
  deleteProductByBarcode,
  postProduct,
  patchProduct,
  getProductsFilteredByName,
  getPersonalProducts
} from '../controllers/productController'

export const productRoutes = Router()

productRoutes.get('', getProductsFilteredByName)

productRoutes.post('/add', postProduct)

productRoutes.get('/personal', getPersonalProducts)

productRoutes.get('/:barcode', getProductByBarcode)

productRoutes.delete('/:barcode', deleteProductByBarcode)

productRoutes.patch('/:barcode', patchProduct)
