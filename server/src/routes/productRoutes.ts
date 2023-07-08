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

// read products and personal products filtered by name
productRoutes.get('', (req, res, next) =>
  getProductsFilteredByName(req as AuthRequest, res, next)
)

// create personal product
productRoutes.post('/add', (req, res, next) =>
  postProduct(req as AuthRequest, res, next)
)

// read personal products
productRoutes.get('/personal', (req, res, next) =>
  getPersonalProducts(req as AuthRequest, res, next)
)

// read product and personal product with barcode
productRoutes.get('/:barcode', (req, res, next) =>
  getProductByBarcode(req as AuthedBarcodeRequest, res, next)
)

// delete product with barcode
productRoutes.delete('/:barcode', (req, res, next) =>
  deleteProductByBarcode(req as AuthedBarcodeRequest, res, next)
)

// update product with barcode
productRoutes.patch('/:barcode', (req, res, next) =>
  patchProduct(req as AuthedBarcodeRequest, res, next)
)
