import express from 'express';
import { sleepController } from '../controller/';

const router = express.Router();

router.get('/', sleepController.getSleepEntries);
router.get('/:name/:gender', sleepController.getSleepEntriesByUser);
router.post('/create', sleepController.createSleepEntry);

export default router;