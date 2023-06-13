import { Router } from 'express'
import {
  getProductByBarcode,
  deleteProductByBarcode,
  postProduct,
  patchProduct,
  getProductsFilteredByName,
  getPersonalProducts
} from '../controllers/productController'
import { AuthedBarcodeRequest, AuthRequest } from '../types/authTypes'

export const productRoutes = Router()

productRoutes.get('', (req, res, next) =>
  getProductsFilteredByName(req as AuthRequest, res, next)
)

productRoutes.post('/add', (req, res, next) =>
  postProduct(req as AuthRequest, res, next)
)

productRoutes.get('/personal', (req, res, next) =>
  getPersonalProducts(req as AuthRequest, res, next)
)

productRoutes.get('/:barcode', (req, res, next) =>
  getProductByBarcode(req as AuthedBarcodeRequest, res, next)
)

productRoutes.delete('/:barcode', (req, res, next) =>
  deleteProductByBarcode(req as AuthedBarcodeRequest, res, next)
)

productRoutes.patch('/:barcode', (req, res, next) =>
  patchProduct(req as AuthedBarcodeRequest, res, next)
)
