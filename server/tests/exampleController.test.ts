import request = require('supertest');
import app from '../src/app';

describe('GET /api/example', () => {
    it('should return a JSON message', async () => {
        const response = await request(app).get('/api/example');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello from the example controller!' });
    });
});
