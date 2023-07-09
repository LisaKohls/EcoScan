import { Product } from '../../models/productModel'
import { Sustainability } from '../../models/sustainabilityModel'
import { NextFunction, Response } from 'express'
import { updateProductByBarcodeService } from '../../services/products/productService'
import { PersonalUserProduct } from '../../models/personalUserProductModel'
import { AuthedBarcodeRequest, AuthRequest } from '../../types/authTypes'

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

export const getAllProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find()
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
