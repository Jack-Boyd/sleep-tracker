import { z } from 'zod';
import prisma from '../config/db';
import { startOfDay, subWeeks } from 'date-fns';
import { SleepEntry } from '@prisma/client';

const sleepEntrySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gender: z.string().min(1, 'Gender is required'),
  sleepTimeDuration: z.number().min(1, 'Sleep time duration must be greater than 0'),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
});

type SleepEntryInput = z.infer<typeof sleepEntrySchema>;

export const getSleepEntries = async (): Promise<Array<{ name: string; gender: string; entryCount: number }>>  => {
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
    return groupedSleepEntries.map(entry => ({
      name: entry.name,
      gender: entry.gender,
      entryCount: entry._count.name,
    }));
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching sleep entries');
  }
};

export const getSleepEntriesByUser = async (name: string, gender: string): Promise<SleepEntry[]> => {
  try {
    const sleepEntries = await prisma.sleepEntry.findMany({
      where: {
        name: name,
        gender: gender,
        date: {
          gte: startOfDay(subWeeks(new Date(), 1))
        }
      },
      orderBy: {
        date: 'asc',
      }
    });
    return sleepEntries;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Error fetching sleep entries by name');
  }
};

export const createSleepEntry = async (sleepEntry: SleepEntryInput): Promise<SleepEntry> => {  
  try {
    sleepEntrySchema.parse(sleepEntry);

    const formattedDate = startOfDay(sleepEntry.date);
    const newSleepEntry = await prisma.sleepEntry.create({
      data: {
        name: sleepEntry.name,
        gender: sleepEntry.gender,
        sleepTimeDuration: sleepEntry.sleepTimeDuration,
        date: formattedDate,
      },
    });
    return newSleepEntry;
  } catch (error) {    
    throw new Error(error instanceof Error ? error.message : 'Error creating sleep entry');
  }
};