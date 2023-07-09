import { AuthedBarcodeRequest, AuthRequest } from '../../types/authTypes'
import { NextFunction, Response } from 'express'
import {
  getFilteredProductsService,
  getProductByBarcodeService
} from '../../services/products/productService'
import {
  getFilteredPersonalProductsService,
  getPersonalProductByBarcodeService
} from '../../services/products/personalProductService'
import PermissionForbiddenError from '../../errors/PermissionForbiddenError'
import UserNotFoundError from '../../errors/UserNotFoundError'
import { Product } from '../../models/productModel'
import { PersonalUserProduct } from '../../models/personalUserProductModel'

export const getProductByBarcode = async (
  req: AuthedBarcodeRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const barcode = req.params.barcode

    if (isNaN(Number(barcode))) {
      res.status(400).json({ error: 'Barcode should be a number.' })
      return
    }

    const barcodeNumber = Number(barcode)
    const product = await getProductByBarcodeService(
      barcodeNumber,
      req.user.username
    )

    if (!product) {
      try {
        const personalProduct = await getPersonalProductByBarcodeService(
          barcodeNumber,
          req.user.username
        )

        if (!personalProduct) {
          return res
            .status(400)
            .send(`No Product with barcode ${barcodeNumber} found`)
        }

        return res
          .status(200)
          .send({ ...personalProduct, isPersonalProduct: true })
      } catch (error) {
        if (error instanceof PermissionForbiddenError) {
          return res.status(403).json({ error: 'Access forbidden' })
        } else if (error instanceof UserNotFoundError) {
          return res.status(404).json({ error: 'User not found' })
        } else {
          next(error)
        }
      }
    }

    res.send(product)
  } catch (error) {
    next(error)
  }
}

export const getProductsFilteredByName = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = (req.query.name as string) || ''
    const products = await getFilteredProductsService(name, req.user.username)
    const personalProducts = await getFilteredPersonalProductsService(
      name,
      req.user.username
    )

    const items = products.concat(personalProducts)
    res.send(items)
  } catch (error) {
    next(error)
  }
}

export const deleteProductByBarcode = async (
  req: AuthedBarcodeRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const barcode = req.params.barcode

    if (isNaN(Number(barcode))) {
      res.status(400).json({ error: 'Barcode should be a number.' })
      return
    }

    // Delete GreenDB Product
    const product = await Product.findOneAndRemove({ barcode })
    if (!product) {
      const personalProduct = await PersonalUserProduct.findOneAndRemove({
        barcode
      })

      if (!personalProduct) {
        res
          .status(400)
          .send(`There is no Product saved with barcode ${barcode}`)
        return
      }
    }

    res.send('Product was successfully deleted')
  } catch (error) {
    next(error)
  }
}
