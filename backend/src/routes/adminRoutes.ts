import express from 'express';
import { getAllUsers, getAllSessions } from '../controllers/adminController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/users', protect, getAllUsers);
router.get('/sessions', protect, getAllSessions);

export default router;
