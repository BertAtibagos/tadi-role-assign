import { Router } from 'express';
import { getPrograms } from '../controllers/program.controller.js';

const router = Router();
router.post('/', getPrograms); 
export default router;