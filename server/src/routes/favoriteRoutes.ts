import { Router } from 'express'
import {
  addFavorite,
  getAllFavorites,
  removeFavorite
} from '../controllers/favoritesController'
import { AuthRequest } from '../types/authTypes'

export const favoriteRoutes = Router()

favoriteRoutes.post('/add', (req, res, next) =>
  addFavorite(req as AuthRequest, res, next)
)
favoriteRoutes.post('/remove', (req, res, next) =>
  removeFavorite(req as AuthRequest, res, next)
)
favoriteRoutes.get('', (req, res, next) =>
  getAllFavorites(req as AuthRequest, res, next)
)
