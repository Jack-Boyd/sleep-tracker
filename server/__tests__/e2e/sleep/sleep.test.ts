import request from 'supertest';
import { prismaMock } from '../../../src/config/singleton';
import { app } from '../../../src/app';

describe('Sleep Route', () => { 
  describe('GET /api/sleep', () => {
    it('should get sleep entries grouped by user', async () => {
      const mockData = [
        { name: 'Alice', gender: 'Female', _count: { name: 2 } },
        { name: 'Bob', gender: 'Male', _count: { name: 1 } },
      ];
      prismaMock.sleepEntry.groupBy = jest.fn().mockResolvedValue(mockData);

      const response = await request(app).get('/api/sleep');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { name: 'Alice', gender: 'Female', entryCount: 2 },
        { name: 'Bob', gender: 'Male', entryCount: 1 },
      ]);
    });
    it('should return an empty array when there are no sleep entries', async () => {
      prismaMock.sleepEntry.groupBy = jest.fn().mockResolvedValue([]);
    
      const response = await request(app).get('/api/sleep');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    it('should return a 500 status code if there is a database error', async () => {
      const errorMsg = 'Mock error message';
      prismaMock.sleepEntry.groupBy = jest.fn().mockRejectedValue(new Error(errorMsg));

      const response = await request(app).get('/api/sleep');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: {
        message: 'Internal Server Error',
        details: errorMsg
      }});
    });
  });
});
