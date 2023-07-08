import {
  IProduct,
  IProductInitialFormat,
  Product
} from '../models/productModel'
import { getInitialSustainabilities } from './sustainabilityController'
import {
  ISustainabilityLabels,
  Sustainability
} from '../models/sustainabilityModel'
import productJson from '../resources/product.json'
import { Converter } from '../utils/converter'
import { NextFunction, Response } from 'express'
import {
  getFilteredProductsService,
  getProductByBarcodeService,
  updatePersonalProductByBarcodeService,
  updateProductByBarcodeService
} from '../services/productService'
import { PersonalUserProduct } from '../models/personalUserProductModel'
import { AuthedBarcodeRequest, AuthRequest } from '../types/authTypes'
import {
  getFilteredPersonalProductsService,
  getPersonalProductByBarcodeService,
  getPersonalProductsService
} from '../services/personalProductService'
import UserModel from '../models/userModel'
import PermissionForbiddenError from '../errors/PermissionForbiddenError'
import UserNotFoundError from '../errors/UserNotFoundError'

export const postProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      barcode,
      name,
      gender,
      url,
      source,
      merchant,
      categories,
      description,
      country,
      brand,
      price,
      currency,
      imageUrls,
      colors,
      sustainabilityName,
      sustainabilityEco,
      sustainabilitySocial
    } = req.body

    const consumerLifestage = req.body.consumer_lifestage

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
      timestamp: Date(),
      source,
      merchant,
      url,
      country,
      description,
      brand,
      price,
      currency,
      image_urls: imageUrls,
      consumer_lifestage: consumerLifestage,
      colors,
      gender,
      name,
      sustainability
    })

    await product
      .save()
      .then(product => {
        res.send({ message: 'Product was successfully created', product })
      })
      .catch(error => {
        res.status(400).send(error.toString())
      })
  } catch (error) {
    next(error)
  }
}

export const postPersonalProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      barcode,
      name,
      description,
      sustainabilityName,
      sustainabilityEco,
      sustainabilitySocial
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

    const personalUserProduct = new PersonalUserProduct({
      barcode,
      name,
      description,
      sustainability
    })

    await personalUserProduct.save()

    await UserModel.updateOne(
      { username: req.user.username },
      { $addToSet: { personalProducts: barcode } }
    )

    res.status(200).json({ message: 'Product added successfully' })
  } catch (error) {
    next(error)
  }
}

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

export const deleteProductByBarcode = async (
  req: AuthedBarcodeRequest,
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

export const deletePersonalProductByBarcode = async (
  req: AuthedBarcodeRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const barcode = req.params.barcode

    const personalProduct = await getPersonalProductByBarcodeService(
      Number(barcode),
      req.user.username
    )

    const product = await PersonalUserProduct.findOneAndRemove({
      _id: personalProduct.barcode
    })

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
  req: AuthedBarcodeRequest,
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

export const patchPersonalProduct = async (
  req: AuthedBarcodeRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { barcode } = req.params
    const {
      barcode: updatedBarcode,
      name,
      description,
      sustainabilityName,
      sustainabilityEco,
      sustainabilitySocial
    } = req.body

    const updatedFields: any = {}
    if (updatedBarcode) updatedFields.barcode = updatedBarcode
    if (name) updatedFields.name = name
    if (description) updatedFields.description = description
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

    const updatedPersonalProduct = await updatePersonalProductByBarcodeService(
      barcode,
      req.user.username,
      updatedFields
    )

    if (!updatedPersonalProduct) {
      return res
        .status(404)
        .send({ message: `Product not found with barcode ${barcode}` })
    }

    res.send({
      message: 'Product was successfully updated',
      product: updatedPersonalProduct
    })
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
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const personalProducts = await getPersonalProductsService(
      req.user.username
    )
    res.send(personalProducts)
  } catch (error) {
    next(error)
  }
}
