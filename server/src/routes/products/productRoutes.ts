import { Router } from 'express'
import {
  getAllProducts,
  deleteProductByBarcode,
  patchProduct,
  postProduct
} from '../../controllers/products/productController'
import { AuthedBarcodeRequest, AuthRequest } from '../../types/authTypes'

export const productRoutes = Router()

// create greendb product
productRoutes.post('/add', (req, res, next) =>
  postProduct(req as AuthRequest, res, next)
)

// read all products from greendb
productRoutes.get('', (req, res, next) =>
  getAllProducts(req as AuthRequest, res, next)
)

// delete product with barcode
productRoutes.delete('/:barcode', (req, res, next) =>
  deleteProductByBarcode(req as AuthedBarcodeRequest, res, next)
)

// update product with barcode
productRoutes.patch('/:barcode', (req, res, next) =>
  patchProduct(req as AuthedBarcodeRequest, res, next)
)
