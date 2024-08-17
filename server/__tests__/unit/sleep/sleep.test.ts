import { prismaMock } from '../../../src/config/singleton';
import { getSleepEntries } from '../../../src/services/sleep';

describe('get user entry count', () => {
  it('should return grouped and mapped sleep entries', async () => {
    const mockData = [
      { name: 'Alice', gender: 'Female', _count: { name: 2 } },
      { name: 'Bob', gender: 'Male', _count: { name: 1 } },
    ];
    prismaMock.sleepEntry.groupBy = jest.fn().mockResolvedValue(mockData);
  
    const result = await getSleepEntries();
    expect(result).toEqual([
      { name: 'Alice', gender: 'Female', entryCount: 2 },
      { name: 'Bob', gender: 'Male', entryCount: 1 },
    ]);
  });

  it('should return empty array when there are no entries', async () => {
    prismaMock.sleepEntry.groupBy = jest.fn().mockResolvedValue([]);

    const result = await getSleepEntries();
    expect(result).toEqual([]);
  });
  
  it('should handle unexpected data structure gracefully', async () => {
    const mockData = [
      { name: 'Alice', gender: 'Female', _count: {} },
    ];
    prismaMock.sleepEntry.groupBy = jest.fn().mockResolvedValue(mockData);

    const result = await getSleepEntries();
    expect(result).toEqual([
      { name: 'Alice', gender: 'Female', entryCount: undefined }, 
    ]);
  });

  it('should handle null or undefined values in data', async () => {
    const mockData = [
      { name: null, gender: 'Female', _count: { name: null } },
    ];
    prismaMock.sleepEntry.groupBy = jest.fn().mockResolvedValue(mockData);

    const result = await getSleepEntries();
    expect(result).toEqual([
      { name: null, gender: 'Female', entryCount: null },
    ]);
  });

  it('should throw an error if prisma.groupBy throws an error', async () => {
    prismaMock.sleepEntry.groupBy = jest.fn().mockImplementation();
    await expect(getSleepEntries()).rejects.toThrow();
  });
});