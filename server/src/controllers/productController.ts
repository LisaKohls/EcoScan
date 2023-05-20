import {IProduct, IProductInitialFormat, Product} from '../models/productModel'
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
