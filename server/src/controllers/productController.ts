import {
  IProduct,
  IProductInitialFormat,
  Product
} from '../models/productModel'
import { getInitialSustainabilities } from './sustainabilityController'
import { ISustainability, Sustainability } from '../models/sustainabilityModel'
import productJson from '../resources/product.json'
import { Converter } from '../utils/converter'
import { NextFunction, Request, Response } from 'express'
import {
  getFilteredProductsService,
  getProductByBarcodeService,
  updateProductByBarcodeService
} from '../services/productService'

export const initializeProductDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productsFromDB: IProduct[] = await Product.find()
    if (productsFromDB.length === 0) {
      // Insert Products only when product db is empty
      const products = getInitialProducts()
      for (const p of products) {
        await p.save()
      }
      res.status(201).send('Initial Products successfully created')
    } else {
      res.status(400).send('DB was already initialized')
    }
  } catch (error) {
    next(error)
  }
}

export const postProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      sustainabilityName,
      sustainabilityEco,
      sustainabilitySocial,
      barcode,
      categories,
      name,
      description,
      imageUrls
    } = req.body

    const sustainability = new Sustainability({
      name: sustainabilityName,
      eco_chemicals: sustainabilityEco,
      eco_lifetime: sustainabilityEco,
      eco_water: sustainabilityEco,
      eco_inputs: sustainabilityEco,
      eco_quality: sustainabilityEco,
      eco_energy: sustainabilityEco,
      eco_waste_air: sustainabilityEco,
      eco_environmental_management: sustainabilityEco,
      social_labour_rights: sustainabilitySocial,
      social_business_practice: sustainabilitySocial,
      social_social_rights: sustainabilitySocial,
      social_company_responsibility: sustainabilitySocial,
      social_conflict_minerals: sustainabilitySocial
    })

    const product = new Product({
      barcode,
      categories,
      name,
      description,
      image_urls: imageUrls,
      sustainability
    })

    await product.save()
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
    if (sustainabilityName) { updatedFields['sustainability.name'] = sustainabilityName }
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

    /* if (products.length === 0) {
      return res.status(400).send(`No Product that contains name ${name}`)
    } */

    res.send(products)
  } catch (error) {
    next(error)
  }
}

export function getInitialProducts (): IProduct[] {
  try {
    const initialSustainabilites: ISustainability[] =
      getInitialSustainabilities()
    const productJsonFormat: IProductInitialFormat[] = JSON.parse(
      JSON.stringify(productJson)
    )

    return productJsonFormat.map(p => {
      const sustainability = initialSustainabilites.find(sustainability =>
        p.sustainability_labels.some(label => label === sustainability.ref)
      )
      return Converter.toProduct(p, sustainability)
    })
  } catch (error) {
    console.log(error)
    return []
  }
}
