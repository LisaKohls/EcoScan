import { getInitialSustainabilities } from '../src/controllers/sustainabilityController';

describe('getInitialSustainabilities', () => {
    it('Should return a list of sustainability', () => {
        const sustainabilities = getInitialSustainabilities()
        expect(sustainabilities.length).toBe(2)
    })
})