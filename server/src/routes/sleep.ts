import express from 'express';
import { sleepController } from '../controller/';

const router = express.Router();

router.get('/', sleepController.getSleepEntries);

export default router;