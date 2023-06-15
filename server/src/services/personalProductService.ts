import userModel from '../models/userModel'
import { getAverageSustainability } from './productService'
import { PersonalUserProduct } from '../models/personalUserProductModel'

export const getFilteredPersonalProductsService = async (
  filter: string,
  username: string
) => {
  const barcode = Number(filter)
  const isNaNBarcode = isNaN(barcode)

  const personalProducts = await PersonalUserProduct.aggregate([
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
        _id: true,
        name: true,
        barcode: true,
        categories: true,
        description: true,
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
  return personalProducts.map((product: any) => ({
    ...product,
    favorite: userFavorites.includes(String(product._id))
  }))
}
