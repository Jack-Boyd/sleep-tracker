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
export const getSleepEntriesByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {  
  try {
    const {name, gender} = req.params;
    const data = await sleepService.getSleepEntriesByUser(name, gender);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
export const createSleepEntry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {  
  try {
    const sleepData = req.body;
    const newSleepEntry = await sleepService.createSleepEntry(sleepData);
    res.status(201).json(newSleepEntry);
  } catch (err) {
    next(err);
  }
};