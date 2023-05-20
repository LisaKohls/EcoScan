import {getInitialProducts} from "../src/controllers/productController";

describe('getInitialProducts', () => {
    it('Should return a list of products', () => {
        const products = getInitialProducts()
        expect(products.length === 3)
    })
})