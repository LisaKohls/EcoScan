import app from '../../src/app'
import userModel from '../../src/models/userModel'
import { Product } from '../../src/models/productModel'
import { PersonalUserProduct } from '../../src/models/personalUserProductModel'
const request = require('supertest')

jest.mock('../../src/models/userModel')
jest.mock('../../src/models/productModel')
jest.mock('../../src/models/personalUserProductModel')
jest.mock('../../src/middlewares/authMiddleware', () => ({
  __esModule: true,
  default: (req: any, res: any, next: any) => {
    req.user = { username: 'test' } // Set user object
    next()
  }
}))

describe('GET /favorites', () => {
  it('should respond with a 200 status and fetch all favorite products', async () => {
    const mockFavorites = [12345678]
    const mockProducts = [
      {
        _id: 12345678,
        name: 'Mock Product',
        categories: ['Test'],
        description: 'Mock Product'
      },
      {
        _id: 88888888,
        name: 'Mock Product 2',
        categories: ['Test'],
        description: 'Mock Product 2'
      }
    ]

    const expectedProducts = mockProducts.filter(product =>
      mockFavorites.includes(product._id)
    )

    userModel.findOne = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({ favorites: mockFavorites })
      })
    })

    Product.aggregate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(expectedProducts)
    })

    PersonalUserProduct.aggregate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([]) // This list should be empty as no personal product is in favorites
    })

    const res = await request(app)
      .get('/api/favorites')
      .set('Authorization', 'Bearer token') // Set a valid token

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expectedProducts) // Change this line
  })
})
