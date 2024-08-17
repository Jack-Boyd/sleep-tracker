import { prismaMock } from '../../../src/config/singleton';
import { getSleepEntries, getSleepEntriesByUser } from '../../../src/services/sleep';

describe('sleep service unit tests', () => {
  describe('get all entries, grouped by user', () => {
    it('should return grouped and mapped sleep entries', async () => {
      const mockData = [
        { name: 'Alice', gender: 'Female', _count: { name: 2 } },
        { name: 'Bob', gender: 'Male', _count: { name: 1 } },
      ];
      prismaMock.sleepEntry.groupBy = jest.fn().mockResolvedValueOnce(mockData);    
      const result = await getSleepEntries();
      expect(result).toEqual([
        { name: 'Alice', gender: 'Female', entryCount: 2 },
        { name: 'Bob', gender: 'Male', entryCount: 1 },
      ]);
    });  
    it('should return empty array when there are no entries', async () => {
      prismaMock.sleepEntry.groupBy = jest.fn().mockResolvedValueOnce([]);  
      const result = await getSleepEntries();
      expect(result).toEqual([]);
    });  
    it('should throw an error if prisma throws an error', async () => {
      prismaMock.sleepEntry.groupBy = jest.fn().mockImplementation();
      await expect(getSleepEntries()).rejects.toThrow();
    });
  });
  describe('get sleep entries by user', () => {
    const mockData = [
      { id: 45, name: "Ben", gender: "Male", sleepTimeDuration: 9, date: new Date("2024-08-09") },
      { id: 44, name: "Ben", gender: "Male", sleepTimeDuration: 8, date: new Date("2024-08-10") },
    ];
    it('should return grouped and mapped sleep entries', async () => {      
      prismaMock.sleepEntry.findMany.mockResolvedValueOnce(mockData);    
      const result = await getSleepEntriesByUser('Ben', 'Male');
      expect(result).toEqual(mockData);
    });
    it('should return nothing if not existing in database', async () => {
      prismaMock.sleepEntry.findMany.mockResolvedValueOnce([]);
      const result = await getSleepEntriesByUser('Ben', 'Female');
      expect(result).toEqual([]);
    });
    it('should return nothing if both name and gender are empty', async () => {
      prismaMock.sleepEntry.findMany.mockResolvedValueOnce([]);
      const result = await getSleepEntriesByUser('', '');
      expect(result).toEqual([]);
    });
    it('should return nothing if gender is empty', async () => {
      prismaMock.sleepEntry.findMany.mockResolvedValueOnce([]);
      const result = await getSleepEntriesByUser('Ben', '');
      expect(result).toEqual([]);
    });
    it('should return nothing if name is empty', async () => {
      prismaMock.sleepEntry.findMany.mockResolvedValueOnce([]);
      const result = await getSleepEntriesByUser('', 'Female');
      expect(result).toEqual([]);
    });
    it('should throw an error if prisma throws an error', async () => {
      prismaMock.sleepEntry.findMany.mockImplementation();
      await expect(getSleepEntries()).rejects.toThrow();
    });
  });
  // describe('create sleep entry', () => {

  // });
});
