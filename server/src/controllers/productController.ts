import { IProduct, IProductInitialFormat } from '../models/productModel'
import { getInitialSustainabilities } from './sustainabilityController'
import { ISustainability } from '../models/sustainabilityModel'
import productJson from '../resources/product.json'
import { Converter } from '../utils/converter'
import { Request, Response } from 'express'

export const initProducts = {}

export const initializeProductDb = async (req: Request, res: Response) => {
  try {
    const products = getInitialProducts()
    for (const p of products) {
      await p.save()
    }
    res.status(201).send('Initial Products successfully created')
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
