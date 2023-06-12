import {
  IProduct,
  IProductInitialFormat,
  Product
} from '../models/productModel'
import { getInitialSustainabilities } from './sustainabilityController'
import { ISustainabilityLabels } from '../models/sustainabilityModel'
import productJson from '../resources/product.json'
import { Converter } from '../utils/converter'
import { NextFunction, Request, Response } from 'express'
import {
  getFilteredProductsService,
  getProductByBarcodeService,
  updateProductByBarcodeService
} from '../services/productService'
import { PersonalUserProduct } from '../models/personalUserProductModel'

export const postProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: add sustainability index
    // TODO: check if barcode exists in other doc (prePopulated data)
    const { barcode, name, description } = req.body

    const personalUserProduct = new PersonalUserProduct({
      barcode,
      name,
      description
    })

    await personalUserProduct.save()
    res.status(200).json({ message: 'Product added successfully' })
  } catch (error) {
    next(error)
  }
}

export const getProductByBarcode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const barcode = req.params.barcode
    const product = await getProductByBarcodeService(barcode)

    if (product) {
      return res.status(400).send(`No Product with barcode ${barcode} found`)
    }

    res.send(product)
  } catch (error) {
    next(error)
  }
}

export const deleteProductByBarcode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const barcode = req.params.barcode

    const product = await Product.findOneAndRemove({ barcode })

    if (!product) {
      res.status(400).send(`There is no Product saved with barcode ${barcode}`)
    } else {
      res.send('Product was successfully deleted')
    }
  } catch (error) {
    next(error)
  }
}

export const patchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { barcode } = req.params
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

export const getProductsFilteredByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = (req.query.name as string) || ''
    const products = await getFilteredProductsService(name)
    res.send(products)
  } catch (error) {
    next(error)
  }
}

export function getInitialProducts (): IProduct[] {
  try {
    const initialSustainabilityLabels: ISustainabilityLabels[] =
      getInitialSustainabilities()
    const productJsonFormat: IProductInitialFormat[] = productJson

    return productJsonFormat.map(p => {
      const sustainabilityLabels = initialSustainabilityLabels.find(susLabel =>
        p.sustainability_labels.some(label => label === susLabel.ref)
      )
      return Converter.toProduct(p, sustainabilityLabels)
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getPersonalProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const personalProducts = await PersonalUserProduct.find()
    res.send(personalProducts)
  } catch (error) {
    next(error)
  }
}
