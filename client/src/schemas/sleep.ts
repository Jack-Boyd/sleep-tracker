import { z } from 'zod';

export const sleepEntrySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  gender: z.enum(['Male', 'Female', 'Prefer not to say', 'Other'], {
    errorMap: () => ({ message: 'Gender is required' })
  }),
  sleepTimeDuration: z.number({
    invalid_type_error: 'Sleep duration must be at least 1 hour',
  }).min(1, { message: 'Sleep duration must be at least 1 hour' }),
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use dd/mm/yyyy.')
    .refine(value => {
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }, 'Invalid date.')
});

export type SleepEntry = z.infer<typeof sleepEntrySchema>;