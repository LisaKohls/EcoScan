import app from '../../src/app'
import { checkProductExists } from '../../src/services/productService'
import userModel from '../../src/models/userModel'
import { PersonalUserProduct } from '../../src/models/personalUserProductModel'
const request = require('supertest')

jest.mock('../../src/models/userModel')
jest.mock('../../src/services/productService')
jest.mock('../../src/middlewares/authMiddleware', () => ({
  __esModule: true,
  default: (req: any, res: any, next: any) => {
    req.user = { username: 'test' } // Set user object
    next()
  }
}))

jest.mock('../../src/models/personalUserProductModel', () => ({
  __esModule: true,
  PersonalUserProduct: {
    create: jest.fn().mockResolvedValue({
      _id: 12345678,
      name: 'Test product',
      description: 'This is a test product.'
    })
  }
}))

// Set up a mock function for userModel.updateOne and userModel.create
const mockUpdateOne = userModel.updateOne as jest.Mock
const mockCreate = userModel.create as jest.Mock
const mockCreateProduct = PersonalUserProduct.create as jest.Mock

// Define the setup function
async function addPersonalProductAndUser () {
  // Mock the creation of a user
  await mockCreate.mockResolvedValue({
    username: 'test',
    password: 'password',
    email: 'test@test.com',
    personalProducts: []
  })

  // Mock the creation of a product
  await mockCreateProduct.mockResolvedValue({
    _id: 12345678,
    name: 'Test product',
    description: 'This is a test product.'
  })

  // Mock the user's update to add the product to their personal products
  await mockUpdateOne.mockImplementationOnce(() =>
    Promise.resolve({ nModified: 1 })
  )
}

describe('Add GreenDB Product to favorites (POST /api/favorites/add)', () => {
  // Run setup before each test
  beforeEach(async () => {
    await addPersonalProductAndUser()
  })
  it('should respond with a 200 status and add a product to favorites', async () => {
    (
      checkProductExists as jest.MockedFunction<typeof checkProductExists>
    ).mockImplementationOnce(() => Promise.resolve(true));
    (userModel.updateOne as jest.Mock).mockResolvedValue({ nModified: 1 })

    const res = await request(app)
      .post('/api/favorites/add')
      .send({ barcode: 12345678 })
      .set('Authorization', 'Bearer token') // Set a valid token

    console.log(res)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty(
      'message',
      'Product with barcode 12345678 added to favorites'
    )
  })

  // More test cases like product does not exist, user does not exist etc.
})
