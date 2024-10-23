// backend/tests/unit/models/motel.test.js
const Motel = require('../../../src/models/motel.model');
const db = require('../../../src/config/database');

jest.mock('../../../src/config/database');

describe('Motel Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new motel', async () => {
            const motelData = {
                name: 'Test Motel',
                address: 'Test Address',
                contact_number: '123-456-7890',
                email: 'test@motel.com'
            };

            db.execute.mockResolvedValueOnce([{ insertId: 1 }]);

            const result = await Motel.create(motelData);
            expect(result).toBe(1);
            expect(db.execute).toHaveBeenCalledWith(
                expect.any(String),
                [motelData.name, motelData.address, motelData.contact_number, motelData.email]
            );
        });
    });

    describe('findById', () => {
        it('should find motel by id', async () => {
            const motel = {
                id: 1,
                name: 'Test Motel',
                address: 'Test Address'
            };

            db.execute.mockResolvedValueOnce([[motel]]);

            const result = await Motel.findById(1);
            expect(result).toEqual(motel);
            expect(db.execute).toHaveBeenCalledWith(
                expect.any(String),
                [1]
            );
        });
    });
});
