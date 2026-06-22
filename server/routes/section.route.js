import { Router } from 'express';
import { getSection } from '../controllers/section.controller.js';

const router = Router();
router.post('/', getSection);
export default router;