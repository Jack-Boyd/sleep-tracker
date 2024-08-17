import { Request, Response, NextFunction } from 'express';
import { sleepService } from '../services';

export const getSleepEntries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await sleepService.getSleepEntries();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};