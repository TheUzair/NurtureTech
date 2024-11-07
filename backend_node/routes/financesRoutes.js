import express from 'express';
import { getAllFinances } from '../controllers/financesController.js';

const router = express.Router();

// Get all financial records
router.get('/', getAllFinances);

export default router;
