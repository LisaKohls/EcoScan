import { NextFunction, Response } from 'express'
import { PersonalUserProduct } from '../../models/personalUserProductModel'
import { AuthedBarcodeRequest, AuthRequest } from '../../types/authTypes'
import {
  getPersonalProductByBarcodeService,
  getPersonalProductsService,
  updatePersonalProductByBarcodeService
} from '../../services/products/personalProductService'
import UserModel from '../../models/userModel'
import { Sustainability } from '../../models/sustainabilityModel'

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

    if (!barcode) {
      res.status(400).json({ error: 'Barcode is required' })
      return
    }
    if (isNaN(Number(barcode))) {
      res.status(400).json({ error: 'Barcode should be a number.' })
      return
    }

    if (!name) {
      res.status(400).json({ error: 'Name is required' })
      return
    }

    if (!description) {
      res.status(400).json({ error: 'Description is required' })
      return
    }

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

    await personalUserProduct
      .save()
      .then(async product => {
        await UserModel.updateOne(
          { username: req.user.username },
          { $addToSet: { personalProducts: barcode } }
        )

        res.send({
          message: 'Personal product was successfully created',
          product
        })
      })
      .catch(error => {
        // Only catch duplicate key error
        if (error.code === 11000) {
          res.status(409).json({
            duplicate_key_error: `There already exists a product with barcode ${barcode}`
          })
        } else {
          throw error
        }
      })
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

    if (isNaN(Number(barcode))) {
      res.status(400).json({ error: 'Barcode should be a number.' })
      return
    }

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

export const patchPersonalProduct = async (
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
