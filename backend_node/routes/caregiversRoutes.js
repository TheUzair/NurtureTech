import express from 'express';
import { getAllCaregivers } from '../controllers/caregiversController.js';

const router = express.Router();

// Get all caregivers
router.get('/', getAllCaregivers);

export default router;
