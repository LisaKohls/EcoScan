import { NextFunction, Response } from 'express'
import {
  createProductService,
  deleteProductByBarcodeService,
  getAllProductsService,
  updateProductByBarcodeService
} from '../../services/products/productService'
import { AuthedBarcodeRequest, AuthRequest } from '../../types/authTypes'

export const postProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await createProductService(req.body)

    res
      .status(201)
      .send({ message: 'Product was successfully created', product })
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({
        error: `There already exists a product with barcode ${req.body.barcode}`
      })
    } else {
      res.status(400).send(error.toString())
    }
    next(error)
  }
}

export const getAllProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProductsService()
    return res.status(200).send(products)
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
    const product = await deleteProductByBarcodeService(barcode)
    if (!product) {
      res.status(400).send(`There is no Product saved with barcode ${barcode}`)
      return
    }

    res.send('Product was successfully deleted')
  } catch (error) {
    next(error)
  }
}

export const patchProduct = async (
  req: AuthedBarcodeRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { barcode } = req.params

    if (isNaN(Number(barcode))) {
      res.status(400).json({ error: 'Barcode should be a number.' })
      return
    }

    const {
      barcode: updatedBarcode,
      categories,
      name,
      description,
      imageUrls,
      sustainabilityName,
      sustainabilityEco,
      sustainabilitySocial
    } = req.body

    const updatedFields: any = {}
    if (updatedBarcode) updatedFields.barcode = updatedBarcode
    if (categories) updatedFields.categories = categories
    if (name) updatedFields.name = name
    if (description) updatedFields.description = description
    if (imageUrls) updatedFields.image_urls = imageUrls
    if (sustainabilityName) {
      updatedFields['sustainability.name'] = sustainabilityName
    }
    if (sustainabilityEco) {
      const ecoFields = [
        'eco_chemicals',
        'eco_lifetime',
        'eco_water',
        'eco_inputs',
        'eco_quality',
        'eco_energy',
        'eco_waste_air',
        'eco_environmental_management'
      ]
      ecoFields.forEach(field => {
        updatedFields[`sustainability.${field}`] = sustainabilityEco
      })
    }
    if (sustainabilitySocial) {
      const socialFields = [
        'social_labour_rights',
        'social_business_practice',
        'social_social_rights',
        'social_company_responsibility',
        'social_conflict_minerals'
      ]
      socialFields.forEach(field => {
        updatedFields[`sustainability.${field}`] = sustainabilitySocial
      })
    }

    const updatedProduct = await updateProductByBarcodeService(
      barcode,
      updatedFields
    )

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' })
    }

    res.send({
      message: 'Product was successfully updated',
      product: updatedProduct
    })
  } catch (error) {
    next(error)
  }
}
