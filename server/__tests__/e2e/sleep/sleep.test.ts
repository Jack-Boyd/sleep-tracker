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
  describe('GET /api/sleep/:name/:gender', () => {
    it('should get entries for user (name/gender)', async () => {
      const mockData = [
        { id: 1, name: 'Alice', gender: 'Female', sleepTimeDuration: 8, date: new Date('2024-08-19') },
        { id: 2, name: 'Alice', gender: 'Female', sleepTimeDuration: 6, date: new Date('2024-08-18') },
      ];
      prismaMock.sleepEntry.findMany.mockResolvedValue(mockData);
      const response = await request(app).get('/api/sleep/Alice/Female');
      expect(response.body).toEqual([
        { id: 1, name: 'Alice', gender: 'Female', sleepTimeDuration: 8, date: '2024-08-19T00:00:00.000Z' },
        { id: 2, name: 'Alice', gender: 'Female', sleepTimeDuration: 6, date: '2024-08-18T00:00:00.000Z' },
      ]);
    });
    it('should return an empty array when there are no sleep entries', async () => {
      prismaMock.sleepEntry.findMany.mockResolvedValue([]);    
      const response = await request(app).get('/api/sleep/Alice/Female');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    it('should return a 500 status code if there is a database error', async () => {
      const errorMsg = 'Mock error message';
      prismaMock.sleepEntry.findMany.mockRejectedValue(new Error(errorMsg));

      const response = await request(app).get('/api/sleep/Alice/Female');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: {
        message: 'Internal Server Error',
        details: errorMsg
      }});
    });
  });
  describe('POST /api/sleep/create', () => {
    it('should create new entry and return it', async () => {
      const mockData = { 
        id: 1, 
        name: 'Alice', 
        gender: 'Female', 
        sleepTimeDuration: 8, 
        date: new Date('2024-08-19') 
      };
              
      prismaMock.sleepEntry.create.mockResolvedValue(mockData);
      const response = await request(app).post('/api/sleep/create').send({
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: '2024-08-19',
      });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 1,
        name: 'Alice', 
        gender: 'Female', 
        sleepTimeDuration: 8, 
        date: '2024-08-19T00:00:00.000Z'
      });
    });
    it('should return a 500 status code if there is a database error', async () => {
      const errorMsg = 'Mock error message';
      prismaMock.sleepEntry.create.mockRejectedValue(new Error(errorMsg));

      const response = await request(app).post('/api/sleep/create').send({
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: '2024-08-19',
      });
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: {
        message: 'Internal Server Error',
        details: errorMsg
      }});
    });
  });
});
