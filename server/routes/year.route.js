import { Router } from 'express';
import { getYears } from '../controllers/year.controller.js';

const router = Router();
router.get('/', getYears); 
export default router;