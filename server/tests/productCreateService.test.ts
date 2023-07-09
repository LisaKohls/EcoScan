import { createProductService } from '../src/services/products/productService'

export const mockProduct = {
  _id: 12345,
  name: 'Mock Product',
  barcode: 12345,
  categories: ['Mock Category'],
  description: 'Mock Description',
  price: 10,
  currency: 'USD',
  url: 'https://mockproduct.com',
  source: 'Mock Source',
  image_urls: ['https://mockproduct.com/image.jpg'],
  sustainability: {
    name: 'Mock Sustainability',
    eco_water: 50,
    eco_lifetime: 70
  }
}

jest.mock('../src/models/productModel', () => {
  return {
    Product: jest.fn().mockImplementation(() => {
      return {
        save: jest.fn().mockResolvedValue(mockProduct),
        aggregate: jest.fn(() => ({
          exec: jest.fn().mockResolvedValue([mockProduct])
        })),
        find: jest.fn().mockResolvedValue([mockProduct]),
        findOne: jest.fn().mockResolvedValue(mockProduct),
        findOneAndUpdate: jest.fn().mockResolvedValue(mockProduct),
        findOneAndRemove: jest.fn().mockResolvedValue(mockProduct)
      }
    })
  }
})

jest.mock('../src/models/userModel', () => ({
  findOne: jest.fn()
}))

jest.mock('../src/services/products/productHelperService')

jest.mock('../src/models/sustainabilityModel', () => {
  return {
    Sustainability: jest.fn().mockImplementation(() => {
      return { save: jest.fn() }
    })
  }
})

describe('Product Service', () => {
  test('createProductService', async () => {
    const productData = {
      barcode: '12345',
      name: 'Test Product',
      categories: ['Test Category'],
      description: 'Test Description',
      price: 10,
      currency: 'USD',
      url: 'https://testproduct.com',
      source: 'Test Source',
      imageUrls: ['https://testproduct.com/image.jpg'],
      sustainabilityName: 'Test Sustainability',
      sustainabilityEco: 50,
      sustainabilitySocial: 70
    }
    const newProduct = await createProductService(productData)
    expect(newProduct).toEqual(mockProduct)
  })
})
