import express from 'express';
import { getAllAttendance, predictAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

// Get all attendance records
router.get('/', getAllAttendance);

// Get attendance prediction for current and last week
router.get('/predict-attendance', predictAttendance);

export default router;
