import {getInitialProducts} from "../src/controllers/productController";
import request = require('supertest');
import app from '../src/app';

describe('getInitialProducts', () => {
    it('Should return a list of products', () => {
        const products = getInitialProducts()
        expect(products.length).toBe(3)
    })
})

describe('POST /api/product/init', () => {
    it('should return a JSON message', async () => {
        const response = await request(app).post('/api/product/init');
        expect(response.status).toBe(201);
        expect(response.body).toEqual('Initial Products successfully created');
    });
});