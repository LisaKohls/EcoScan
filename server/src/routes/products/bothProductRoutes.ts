import { Router } from 'express'
import { AuthedBarcodeRequest, AuthRequest } from '../../types/authTypes'
import { getProductsFilteredByName } from '../../services/products/bothProductService'
import { getProductByBarcode } from '../../controllers/products/bothProductController'

export const bothProducts = Router()

// read products and personal products filtered by name
bothProducts.get('', (req, res, next) =>
  getProductsFilteredByName(req as AuthRequest, res, next)
)

// read product and personal product with barcode
bothProducts.get('/:barcode', (req, res, next) =>
  getProductByBarcode(req as AuthedBarcodeRequest, res, next)
)
