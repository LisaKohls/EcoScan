import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { IProductInitialFormat, Product } from '../src/models/productModel'
import { checkProductExists } from '../src/services/productService'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongoServer.stop()
})

describe('checkProductExists', () => {
  it('should return false if product does not exist', async () => {
    const barcode = 123456
    const exists = await checkProductExists(barcode)
    expect(exists).toBe(false)
  })

  it('should return true if product exists', async () => {
    const barcode = 123456
    const product: IProductInitialFormat = {
      barcode,
      categories: ['testCategory'],
      gender: 'Unisex',
      timestamp: new Date().toISOString(),
      url: 'https://test.com',
      source: 'testSource',
      merchant: 'testMerchant',
      country: 'testCountry',
      name: 'testName',
      description: 'testDescription',
      brand: 'testBrand',
      sustainability_labels: ['testLabel'],
      price: 100,
      currency: 'USD',
      image_urls: ['https://test.com/image.png'],
      consumer_lifestage: 'Adult',
      colors: ['Black'],
      sizes: 'M',
      gtin: 'testGtin',
      asi: 'testAsi'
    }
    await Product.create(product)

    const exists = await checkProductExists(barcode)
    expect(exists).toBe(true)
  })
})
