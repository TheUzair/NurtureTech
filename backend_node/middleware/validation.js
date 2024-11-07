import { check, validationResult } from 'express-validator';

export const validateYear = [
  check('year').isInt({ min: 2000, max: 2100 }).withMessage('Invalid year'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
