import { Router } from 'express'
import {
  postPersonalProduct,
  getPersonalProducts,
  patchPersonalProduct,
  deletePersonalProductByBarcode
} from '../../controllers/products/personalProductController'
import { AuthedBarcodeRequest, AuthRequest } from '../../types/authTypes'

export const personalProductRoutes = Router()

// create personal product
personalProductRoutes.post('/add', (req, res, next) =>
  postPersonalProduct(req as AuthRequest, res, next)
)

// read personal products
personalProductRoutes.get('', (req, res, next) =>
  getPersonalProducts(req as AuthRequest, res, next)
)

// delete personal product with barcode
personalProductRoutes.delete('/:barcode', (req, res, next) =>
  deletePersonalProductByBarcode(req as AuthedBarcodeRequest, res, next)
)

// update personal product with barcode
personalProductRoutes.patch('/:barcode', (req, res, next) =>
  patchPersonalProduct(req as AuthedBarcodeRequest, res, next)
)
