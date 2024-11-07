import express from 'express';
import { getAllEnrollments } from '../controllers/enrollmentController.js';

const router = express.Router();

// Get all enrollments
router.get('/', getAllEnrollments);

export default router;
