import { NextFunction, Response } from 'express'
import userModel from '../models/userModel'
import { AuthRequest } from '../types/authTypes'

export const addFavorite = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body

    await userModel.updateOne(
      { username: req.user.username },
      { $addToSet: { favorites: productId } }
    )

    res.status(200).json({ message: 'Product added to favorites' })
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
    const { productId } = req.body

    await userModel.updateOne(
      { username: req.user.username },
      { $pull: { favorites: productId } }
    )

    res.status(200).json({ message: 'Product removed from favorites' })
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
    // Find the user by userId and populate their favorite products
    const user = await userModel
      .findOne({ username: req.user.username })
      .populate('favorites')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user.favorites)
  } catch (error) {
    next(error)
  }
}
