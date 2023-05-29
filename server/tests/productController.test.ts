import {getInitialProducts} from "../src/controllers/productController";
import request = require('supertest');
import app from '../src/app';

describe('getInitialProducts', () => {
    it('Should return a list of products', () => {
        const products = getInitialProducts()
        expect(products.length).toBe(3)
    })
})