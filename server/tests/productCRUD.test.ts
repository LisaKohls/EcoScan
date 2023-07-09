import app from '../src/app'
import { MongoMemoryServer } from 'mongodb-memory-server-global-4.4'
import mongoose, { ConnectOptions } from 'mongoose'
import generateToken from '../src/utils/generateToken'
const request = require('supertest')

const options: ConnectOptions = {}

// Mock Product data
const productData = {
  barcode: 1234567890,
  name: 'Test Product',
  gender: 'Unisex',
  url: 'https://test.com',
  source: 'Test Source',
  merchant: 'Test Merchant',
  categories: ['Category 1', 'Category 2'],
  description: 'Test Description',
  country: 'USA',
  brand: 'Test Brand',
  price: 100.0,
  currency: 'USD',
  imageUrls: ['https://test.com/image1.jpg', 'https://test.com/image2.jpg'],
  colors: ['Red', 'Blue'],
  sustainabilityName: 'Sustainability Test',
  sustainabilityEco: 50,
  sustainabilitySocial: 50,
  consumerLifestage: 'ADULT'
}

let mongoServer: MongoMemoryServer

describe('Product Service', () => {
  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect()
    }
    await mongoose.connect(mongoUri, options)
  }, 30000)

  afterEach(async () => {
    await mongoose.connection.close()
    if (mongoServer) {
      await mongoServer.stop()
    }
  }, 30000)

  // Test creating a new product
  it('should create a new product', async () => {
    const token = generateToken('testUser')

    const localBarcode = 1234

    const res = await request(app)
      .post('/api/products/greendb/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...productData, barcode: localBarcode })

    expect(res.statusCode).toEqual(201)
    expect(res.body.product).toHaveProperty('barcode', localBarcode)
    // ...test other product properties...
  })

  // Test reading all products
  it('should create and get all products', async () => {
    const token = generateToken('testUser')

    const localBarcode = 12345

    const resCreate = await request(app)
      .post('/api/products/greendb/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...productData, barcode: localBarcode })

    expect(resCreate.statusCode).toEqual(201)
    expect(resCreate.body.product).toHaveProperty('barcode', localBarcode)

    const res = await request(app)
      .get('/api/products/greendb')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveLength(1)
  })

  it('should create and delete a product', async () => {
    const token = generateToken('testUser')

    const res = await request(app)
      .post('/api/products/greendb/add')
      .set('Authorization', `Bearer ${token}`)
      .send(productData)

    expect(res.statusCode).toEqual(201)
    expect(res.body.product).toHaveProperty('barcode', productData.barcode)

    // Test deleting a product
    const deleteRes = await request(app)
      .delete(`/api/products/greendb/${productData.barcode}`)
      .set('Authorization', `Bearer ${token}`)
    expect(deleteRes.statusCode).toEqual(200)
    expect(deleteRes.text).toBe('Product was successfully deleted')
  })

  it('should create and update a product', async () => {
    const token = generateToken('testUser')

    const res = await request(app)
      .post('/api/products/greendb/add')
      .set('Authorization', `Bearer ${token}`)
      .send(productData)

    expect(res.statusCode).toEqual(201)
    expect(res.body.product).toHaveProperty('barcode', productData.barcode)

    // Test updating a product
    const updateData = {
      name: 'Test123',
      categories: ['Category 3', 'Category 4']
    }
    const updateRes = await request(app)
      .patch(`/api/products/greendb/${productData.barcode}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
    expect(updateRes.statusCode).toEqual(200)
    expect(updateRes.body.product).toHaveProperty('name', updateData.name)
  })

  it('should create, update, and delete a product', async () => {
    const token = generateToken('testUser')

    const res = await request(app)
      .post('/api/products/greendb/add')
      .set('Authorization', `Bearer ${token}`)
      .send(productData)

    expect(res.statusCode).toEqual(201)
    expect(res.body.product).toHaveProperty('barcode', productData.barcode)

    // Test updating a product
    const updateData = {
      name: 'Test123',
      categories: ['Category 3', 'Category 4']
    }
    const updateRes = await request(app)
      .patch(`/api/products/greendb/${productData.barcode}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
    expect(updateRes.statusCode).toEqual(200)
    expect(updateRes.body.product).toHaveProperty('name', updateData.name)

    // Test deleting a product
    const deleteRes = await request(app)
      .delete(`/api/products/greendb/${productData.barcode}`)
      .set('Authorization', `Bearer ${token}`)
    expect(deleteRes.statusCode).toEqual(200)
    expect(deleteRes.text).toBe('Product was successfully deleted')
  })
})
