import userModel from '../../models/userModel'
import { PersonalUserProduct } from '../../models/personalUserProductModel'
import PermissionForbiddenError from '../../errors/PermissionForbiddenError'
import UserNotFoundError from '../../errors/UserNotFoundError'
import { getAverageSustainability, isFavorite } from './productHelperService'

export const getFilteredPersonalProductsService = async (
  filter: string,
  username: string
) => {
  const barcode = Number(filter)
  const isNaNBarcode = isNaN(barcode)

  const user = await userModel.findOne({ username }).lean()

  if (!user) {
    throw new UserNotFoundError()
  }

  const userPersonalProducts = user.personalProducts

  const personalProducts = await PersonalUserProduct.aggregate([
    {
      $addFields: {
        str_id: { $toString: '$_id' }
      }
    },
    {
      $match: {
        $and: [
          { _id: { $in: userPersonalProducts } },
          {
            $or: [
              { name: { $regex: filter, $options: 'i' } },
              {
                str_id: isNaNBarcode
                  ? '0'
                  : { $regex: `^${filter}`, $options: 'i' }
              }
            ]
          }
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

  const userFavorites = user ? user.favorites : []
  return personalProducts.map((product: any) => ({
    ...product,
    favorite: userFavorites.includes(product.barcode),
    isPersonalProduct: true
  }))
}

export const getPersonalProductByBarcodeService = async (
  barcode: number,
  username: string
) => {
  const user = await userModel.findOne({ username }).lean()

  if (!user) {
    throw new UserNotFoundError()
  }

  const userPersonalProducts = user.personalProducts

  if (!userPersonalProducts.includes(barcode)) {
    throw new PermissionForbiddenError()
  }

  const product = await PersonalUserProduct.aggregate([
    {
      $match: {
        $and: [{ _id: barcode }, { _id: { $in: userPersonalProducts } }]
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        barcode: '$_id',
        categories: 1,
        description: 1,
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
    return { ...product[0], favorite, isPersonalProduct: true }
  }

  return null
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

export const getPersonalProductsService = async (username: string) => {
  const user = await userModel.findOne({ username }).lean()
  const userPersonalProducts = user ? user.personalProducts : []

  const products = await PersonalUserProduct.aggregate([
    {
      $match: {
        _id: { $in: userPersonalProducts }
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

  const userFavorites = user ? user.favorites : []
  return products.map((product: any) => ({
    ...product,
    favorite: userFavorites.includes(product.barcode),
    isPersonalProduct: true
  }))
}

export const checkPersonalProductExists = async (
  username: string,
  barcode: number
): Promise<boolean> => {
  const user = await userModel.findOne({ username }).lean()
  const userPersonalProducts = user ? user.personalProducts : []

  return userPersonalProducts.includes(barcode)
}
