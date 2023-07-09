import { AuthRequest } from '../../types/authTypes'
import { NextFunction, Response } from 'express'
import { getFilteredProductsService } from './productService'
import { getFilteredPersonalProductsService } from './personalProductService'

export const getProductsFilteredByName = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = (req.query.name as string) || ''
    const products = await getFilteredProductsService(name, req.user.username)
    const personalProducts = await getFilteredPersonalProductsService(
      name,
      req.user.username
    )

    const items = products.concat(personalProducts)
    res.send(items)
  } catch (error) {
    next(error)
  }
}
