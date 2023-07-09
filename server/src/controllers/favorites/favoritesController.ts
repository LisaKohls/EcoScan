import { NextFunction, Response } from 'express'
import userModel from '../../models/userModel'
import { AuthRequest } from '../../types/authTypes'
import { checkProductExists } from '../../services/products/productService'
import { Product } from '../../models/productModel'
import { checkPersonalProductExists } from '../../services/products/personalProductService'
import { PersonalUserProduct } from '../../models/personalUserProductModel'
import { getAverageSustainability } from '../../services/products/productHelperService'

export const addFavorite = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { barcode } = req.body

    if (await checkProductExists(barcode)) {
      await userModel.updateOne(
        { username: req.user.username },
        { $addToSet: { favorites: barcode } }
      )

      res.status(200).json({
        message: `Product with barcode ${barcode} added to favorites`
      })
    }

    if (await checkPersonalProductExists(req.user.username, barcode)) {
      await userModel.updateOne(
        { username: req.user.username },
        { $addToSet: { favorites: barcode } }
      )

      res.status(200).json({
        message: `Personal product with barcode ${barcode} added to favorites`
      })
    }

    return res
      .status(404)
      .json({ message: `Product with barcode ${barcode} not found` })
  } catch (error) {
    next(error)
  }
}
export const removeFavorite = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { barcode } = req.body

    if (await checkProductExists(barcode)) {
      await userModel.updateOne(
        { username: req.user.username },
        { $pull: { favorites: barcode } }
      )

      res.status(200).json({
        message: `Product with barcode ${barcode} removed from favorites`
      })
    }

    if (await checkPersonalProductExists(req.user.username, barcode)) {
      await userModel.updateOne(
        { username: req.user.username },
        { $pull: { favorites: barcode } }
      )

      res.status(200).json({
        message: `Personal Product with barcode ${barcode} removed from favorites`
      })
    }

    return res
      .status(404)
      .json({ message: `Product with barcode ${barcode} not found` })
  } catch (error) {
    next(error)
  }
}

export const getAllFavorites = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find the user by userId and only fetch the favorites
    const user = await userModel
      .findOne({ username: req.user.username })
      .select('favorites')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // TODO: exclude to services
    // Perform a second query to fetch the favorite products with the desired structure
    const favorites = await Product.aggregate([
      { $match: { _id: { $in: user.favorites } } },
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
          sustainabilitySocial: getAverageSustainability('social'),
          favorite: { $literal: true }
        }
      }
    ]).exec()

    const personalProducts = await PersonalUserProduct.aggregate([
      { $match: { _id: { $in: user.favorites } } },
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
          sustainabilitySocial: getAverageSustainability('social'),
          favorite: { $literal: true }
        }
      }
    ]).exec()

    res.status(200).json([...favorites, ...personalProducts])
  } catch (error) {
    next(error)
  }
}
