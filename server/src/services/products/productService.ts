import { IProduct, Product } from '../../models/productModel'
import userModel from '../../models/userModel'
import { PersonalUserProduct } from '../../models/personalUserProductModel'
import { getPersonalProductByBarcodeService } from './personalProductService'
import { getAverageSustainability, isFavorite } from './productHelperService'

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
        price: 1,
        currency: 1,
        url: 1,
        source: 1,
        image: { $arrayElemAt: ['$image_urls', 0] },
        sustainabilityName: '$sustainability.name',
        sustainabilityEcoWater: { $ifNull: ['$sustainability.eco_water', 17] },
        sustainabilityEcoLifetime: {
          $ifNull: ['$sustainability.eco_lifetime', 95]
        },
        sustainabilityEco: getAverageSustainability('eco'),
        sustainabilitySocial: getAverageSustainability('social')
      }
    }
  ]).exec()

  if (product.length > 0) {
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
        sustainabilityEcoWater: { $ifNull: ['$sustainability.eco_water', 45] },
        sustainabilityEcoLifetime: {
          $ifNull: ['$sustainability.eco_lifetime', 69]
        },
        sustainabilityEco: getAverageSustainability('eco'),
        sustainabilitySocial: getAverageSustainability('social')
      }
    }
  ]).exec()

  const user = await userModel.findOne({ username }).lean()
  const userFavorites = user ? user.favorites : []
  return products.map((product: any) => ({
    ...product,
    favorite: userFavorites.includes(product.barcode)
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

export const updatePersonalProductByBarcodeService = async (
  barcode: string,
  username: string,
  updatedFields: any
) => {
  const personalProduct = await getPersonalProductByBarcodeService(
    Number(barcode),
    username
  )

  return PersonalUserProduct.findOneAndUpdate(
    { _id: personalProduct.barcode },
    { $set: updatedFields },
    { new: true }
  )
}

export const checkProductExists = async (barcode: number): Promise<boolean> => {
  const product: IProduct | null = await Product.findOne({ _id: barcode })
  return !!product
}
