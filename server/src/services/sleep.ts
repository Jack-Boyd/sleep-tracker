import { z } from 'zod';
import prisma from '../config/db';

const sleepEntrySchema = z.object({
  name: z.string(),
  gender: z.string(),
  sleepTimeDuration: z.number().min(0),
});

export const getSleepEntries = async () => {
  try {
    const groupedSleepEntries = await prisma.sleepEntry.groupBy({
      by: ['name', 'gender'],
      _count: {
        name: true,
      },
      orderBy: {
        name: 'asc',        
      },
    });
    const result = groupedSleepEntries.map(entry => ({
      name: entry.name,
      gender: entry.gender,
      entryCount: entry._count.name,
    }));
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error fetching all sleep entries');
  }
};
