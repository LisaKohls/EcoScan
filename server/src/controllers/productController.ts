import {
  IProduct,
  IProductInitialFormat,
  Product
} from '../models/productModel'
import { getInitialSustainabilities } from './sustainabilityController'
import { ISustainability } from '../models/sustainabilityModel'
import productJson from '../resources/product.json'
import { Converter } from '../utils/converter'
import { Request, Response } from 'express'

export const initializeProductDb = async (req: Request, res: Response) => {
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
    res.status(500).send('Server error.' + error)
  }
}

export const getProductByBarcode = async (req: Request, res: Response) => {
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
            $avg: ['$sustainability.eco_chemicals', '$sustainability.eco_lifetime', '$sustainability.eco_water', '$sustainability.eco_inputs', '$sustainability.eco_quality', '$sustainability.eco_energy', '$sustainability.eco_waste_air', '$sustainability.eco_environmental_management']
          },
          sustainabilitySocial: {
            $avg: ['$sustainability.social_labour_rights', '$sustainability.social_business_practice', '$sustainability.social_social_rights', '$sustainability.social_company_responsibility', '$sustainability.social_conflict_minerals']
          }
        }
      },
      { $limit: 1 }
    ])

    if (product.length === 0) {
      return res.status(400).send(`No Product with barcode ${barcode} found`)
    }

    res.send(product.at(0))
  } catch (e) {
    res.status(500).send('Server error.')
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
