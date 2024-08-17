import express from "express";
import sleepRoutes from './sleep';

const router = express.Router();

router.use('/sleep', sleepRoutes);

export default router;