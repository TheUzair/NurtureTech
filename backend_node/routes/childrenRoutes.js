import express from 'express';
import { getAllChildren } from '../controllers/childrenController.js';
import { validateYear } from '../middleware/validation.js';

const router = express.Router();

// Get all children based on selected year with validation
router.get('/', validateYear, getAllChildren);

export default router;
