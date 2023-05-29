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
    const product = new Product()
    product.barcode = req.body.barcode
    product.categories = req.body.categories
    product.name = req.body.name
    product.description = req.body.description
    product.image_urls = req.body.imageUrls

    const sustainability = new Sustainability()
    sustainability.name = req.body.sustainabilityName
    sustainability.eco_chemicals = req.body.sustainabilityEco
    sustainability.eco_lifetime = req.body.sustainabilityEco
    sustainability.eco_water = req.body.sustainabilityEco
    sustainability.eco_inputs = req.body.sustainabilityEco
    sustainability.eco_quality = req.body.sustainabilityEco
    sustainability.eco_energy = req.body.sustainabilityEco
    sustainability.eco_waste_air = req.body.sustainabilityEco
    sustainability.eco_environmental_management = req.body.sustainabilityEco
    sustainability.social_labour_rights = req.body.sustainabilitySocial
    sustainability.social_business_practice = req.body.sustainabilitySocial
    sustainability.social_social_rights = req.body.sustainabilitySocial
    sustainability.social_company_responsibility =
      req.body.sustainabilitySocial
    sustainability.social_conflict_minerals = req.body.sustainabilitySocial

    product.sustainability = sustainability

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

export const getProductByBarcode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const barcode = req.params.barcode
    const product = await Product.aggregate([
      { $match: { barcode } },
      {
        $project: {
          _id: false,
          name: true,
          barcode: true,
          categories: true,
          description: true,
          image: { $first: '$image_urls' },
          sustainabilityName: '$sustainability.name',
          sustainabilityEco: {
            $avg: [
              '$sustainability.eco_chemicals',
              '$sustainability.eco_lifetime',
              '$sustainability.eco_water',
              '$sustainability.eco_inputs',
              '$sustainability.eco_quality',
              '$sustainability.eco_energy',
              '$sustainability.eco_waste_air',
              '$sustainability.eco_environmental_management'
            ]
          },
          sustainabilitySocial: {
            $avg: [
              '$sustainability.social_labour_rights',
              '$sustainability.social_business_practice',
              '$sustainability.social_social_rights',
              '$sustainability.social_company_responsibility',
              '$sustainability.social_conflict_minerals'
            ]
          }
        }
      },
      { $limit: 1 }
    ])

    if (product.length === 0) {
      return res.status(400).send(`No Product with barcode ${barcode} found`)
    }

    res.send(product.at(0))
  } catch (error) {
    next(error)
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.aggregate([
      {
        $project: {
          _id: false,
          name: true,
          barcode: true,
          categories: true,
          description: true,
          image: { $first: '$image_urls' },
          sustainabilityName: '$sustainability.name',
          sustainabilityEco: {
            $avg: [
              '$sustainability.eco_chemicals',
              '$sustainability.eco_lifetime',
              '$sustainability.eco_water',
              '$sustainability.eco_inputs',
              '$sustainability.eco_quality',
              '$sustainability.eco_energy',
              '$sustainability.eco_waste_air',
              '$sustainability.eco_environmental_management'
            ]
          },
          sustainabilitySocial: {
            $avg: [
              '$sustainability.social_labour_rights',
              '$sustainability.social_business_practice',
              '$sustainability.social_social_rights',
              '$sustainability.social_company_responsibility',
              '$sustainability.social_conflict_minerals'
            ]
          }
        }
      }
    ])

    if (products.length === 0) {
      return res.send('There are no products yet')
    }

    res.send(products)
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
    const barcode = req.params.barcode

    const updatedProduct = await Product.findOneAndUpdate(
      { barcode },
      {
        $set: {
          barcode: req.body.barcode,
          categories: req.body.categories,
          name: req.body.name,
          description: req.body.description,
          image_urls: req.body.imageUrls,
          'sustainability.name': req.body.sustainabilityName,
          'sustainability.eco_chemicals': req.body.sustainabilityEco,
          'sustainability.eco_lifetime': req.body.sustainabilityEco,
          'sustainability.eco_water': req.body.sustainabilityEco,
          'sustainability.eco_inputs': req.body.sustainabilityEco,
          'sustainability.eco_quality': req.body.sustainabilityEco,
          'sustainability.eco_energy': req.body.sustainabilityEco,
          'sustainability.eco_waste_air': req.body.sustainabilityEco,
          'sustainability.eco_environmental_management':
            req.body.sustainabilityEco,
          'sustainability.social_labour_rights': req.body.sustainabilitySocial,
          'sustainability.social_business_practice':
            req.body.sustainabilitySocial,
          'sustainability.social_social_rights': req.body.sustainabilitySocial,
          'sustainability.social_company_responsibility':
            req.body.sustainabilitySocial,
          'sustainability.social_conflict_minerals':
            req.body.sustainabilitySocial
        }
      },
      { new: true }
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
