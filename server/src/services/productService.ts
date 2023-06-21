import { IProduct, Product } from '../models/productModel'
import productJson from '../resources/product.json'
import userModel from '../models/userModel'

const SUSTAINABILITY_METRICS = [
  'eco_chemicals',
  'eco_lifetime',
  'eco_water',
  'eco_inputs',
  'eco_quality',
  'eco_energy',
  'eco_waste_air',
  'eco_environmental_management',
  'social_labour_rights',
  'social_business_practice',
  'social_social_rights',
  'social_company_responsibility',
  'social_conflict_minerals'
]

export const getAverageSustainability = (type: 'eco' | 'social') => {
  const metrics = SUSTAINABILITY_METRICS.filter(metric =>
    metric.startsWith(type)
  )
  return {
    $avg: metrics.map(metric => ({
      $ifNull: [`$sustainability.${metric}`, 0]
    }))
  }
}

export const isFavorite = async (
  username: string,
  barcode: number
): Promise<boolean> => {
  const user = await userModel.findOne({ username })
  if (user) {
    return user.favorites.includes(barcode)
  }
  return false
}

export const prePopulateDataToDB = async () => {
  const count = await Product.countDocuments()
  if (count === 0) {
    for (const productData of productJson) {
      if (productData.barcode) {
        const product = new Product(productData)
        await product.save()
      } else {
        console.error('Error: missing barcode for product', productData)
      }
    }
    console.log('Initial Products successfully created')
  } else {
    console.log('DB was already initialized')
  }
}

export const getProductByBarcodeService = async (
  barcode: number,
  username: string
) => {
  const product = await Product.aggregate([
    { $match: { _id: barcode } },
    {
      $project: {
        _id: 0,
        name: 1,
        barcode: '$_id',
        categories: 1,
        description: 1,
        image: { $arrayElemAt: ['$image_urls', 0] },
        sustainabilityName: '$sustainability.name',
        sustainabilityEcoWater: { $ifNull: ['$sustainability.eco_water', 0] },
        sustainabilityEcoLifetime: {
          $ifNull: ['$sustainability.eco_lifetime', 0]
        },
        sustainabilityEco: getAverageSustainability('eco'),
        sustainabilitySocial: getAverageSustainability('social')
      }
    }
  ]).exec()

  if (product) {
    const favorite = await isFavorite(username, barcode)
    return { ...product[0], favorite }
  }

  return null
}

export const getFilteredProductsService = async (
  filter: string,
  username: string
) => {
  const barcode = Number(filter)
  const isNaNBarcode = isNaN(barcode)

  const products = await Product.aggregate([
    {
      $addFields: {
        str_id: { $toString: '$_id' }
      }
    },
    {
      $match: {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { str_id: isNaNBarcode ? '0' : { $regex: filter, $options: 'i' } }
        ]
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        barcode: '$_id',
        categories: 1,
        description: 1,
        image: { $first: '$image_urls' },
        sustainabilityName: '$sustainability.name',
        sustainabilityEcoWater: { $ifNull: ['$sustainability.eco_water', 0] },
        sustainabilityEcoLifetime: {
          $ifNull: ['$sustainability.eco_lifetime', 0]
        },
        sustainabilityEco: getAverageSustainability('eco'),
        sustainabilitySocial: getAverageSustainability('social')
      }
    }
  ]).exec()

  const user = await userModel.findOne({ username }).lean()
  const userFavorites = user ? user.favorites.map(String) : []
  return products.map((product: any) => ({
    ...product,
    favorite: userFavorites.includes(String(product._id))
  }))
}

export const updateProductByBarcodeService = async (
  barcode: string,
  updatedFields: any
) => {
  return Product.findOneAndUpdate(
    { barcode },
    { $set: updatedFields },
    { new: true }
  )
}

export const checkProductExists = async (barcode: number): Promise<boolean> => {
  const product: IProduct | null = await Product.findOne({ _id: barcode })
  return !!product
}
