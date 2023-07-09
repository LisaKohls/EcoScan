import {
  getProductByBarcodeService,
  getAllProductsService,
  updateProductByBarcodeService,
  checkProductExists
} from '../src/services/products/productService'
import { Product } from '../src/models/productModel'
import userModel from '../src/models/userModel'
import * as helperService from '../src/services/products/productHelperService'

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

export const mockUser = {
  username: 'mockUsername',
  favorites: [12345]
}

jest.mock('../src/models/productModel', () => ({
  Product: {
    aggregate: jest.fn(() => ({
      exec: jest.fn().mockResolvedValue([mockProduct])
    })),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn()
  }
}))

jest.mock('../src/models/userModel', () => ({
  findOne: jest.fn()
}))

jest.mock('../src/services/products/productHelperService')

describe('Product Service', () => {
  beforeEach(() => {
    (Product.find as jest.Mock).mockResolvedValue([mockProduct]);
    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);
    (Product.findOneAndUpdate as jest.Mock).mockResolvedValue(mockProduct);
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (helperService.getAverageSustainability as jest.Mock).mockReturnValue(60);
    (helperService.isFavorite as jest.Mock).mockReturnValue(true)
  })

  test('getProductByBarcodeService', async () => {
    const product = await getProductByBarcodeService(12345, 'mockUsername')
    expect(product).toEqual({ ...mockProduct, favorite: true })
  })

  test('getAllProductsService', async () => {
    const products = await getAllProductsService()
    expect(products).toEqual([mockProduct])
  })

  test('updateProductByBarcodeService', async () => {
    const updatedProduct = await updateProductByBarcodeService('12345', {
      description: 'Updated Description'
    })
    expect(updatedProduct).toEqual(mockProduct)
  })

  test('checkProductExists', async () => {
    const exists = await checkProductExists(12345)
    expect(exists).toEqual(true)
  })
})
