import { Router } from 'express';
import { getClassList } from '../controllers/classlist.controller.js';

const router = Router();
router.post('/', getClassList); 
export default router;