import { prismaMock } from '../../../src/config/singleton';
import { getSleepEntries, getSleepEntriesByUser, createSleepEntry } from '../../../src/services/sleep';

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
      { id: 45, name: "Ben", gender: "Male", sleepTimeDuration: 9, date: new Date("2024-08-19") },
      { id: 44, name: "Ben", gender: "Male", sleepTimeDuration: 8, date: new Date("2024-08-19") },
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
  describe('create sleep entry', () => {    
    it('should create new sleep entry', async () => {      
      const sleepEntry = {
        id: 100,
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: new Date("2024-08-19"),
      }; 
      prismaMock.sleepEntry.create.mockResolvedValue(sleepEntry);
      const result = await createSleepEntry({
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: '2024-08-19',
      });
      expect(result).toEqual({
        id: 100,
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: new Date("2024-08-19"),
      });
    });
    it('should throw error if new entry contains no name', async () => {
      await expect(createSleepEntry({
        name: '',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: '2024-08-19',
      })).rejects.toThrow('Name is required');
    });  
    it('should throw error if new entry contains no gender', async () => {
      await expect(createSleepEntry({
        name: 'Alice',
        gender: '',
        sleepTimeDuration: 8,
        date: '2024-08-19',
      })).rejects.toThrow('Gender is required');
    });    
    it('should throw error if new entry has sleep duration as 0', async () => {
      await expect(createSleepEntry({
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 0,
        date: '2024-08-19',
      })).rejects.toThrow('Sleep time duration must be greater than 0');
    }); 
    it('should throw error if new entry contains invalid date', async () => {
      await expect(createSleepEntry({
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: 'invalid date',
      })).rejects.toThrow('Invalid date format');
    });
    it('should throw error if values are empty/default', async () => {            
      prismaMock.sleepEntry.create.mockImplementation();
      await expect(createSleepEntry({
        name: '',
        gender: '',
        sleepTimeDuration: 0,
        date: '',
      })).rejects.toThrow();
    });
    it('should throw an error if prisma create fails', async () => {
      prismaMock.sleepEntry.create.mockRejectedValue(new Error('Database error'));    
      await expect(createSleepEntry({
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: '2024-08-09',
      })).rejects.toThrow('Database error');
    });
    it('should format date correctly', async () => {
      const sleepEntry = {
        id: 100,
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: new Date("2024-08-19"),
      };
    
      prismaMock.sleepEntry.create.mockResolvedValue(sleepEntry);
    
      const result = await createSleepEntry({
        name: 'Alice',
        gender: 'Female',
        sleepTimeDuration: 8,
        date: '2024-08-19',
      });
    
      expect(result.date).toEqual(new Date("2024-08-19T00:00:00.000Z"));
    });
  });
});
