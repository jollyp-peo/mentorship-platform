import express from 'express';
import { getProfile, updateProfile, getAllUsers } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/me', protect, getProfile);
router.put('/me/profile', protect, updateProfile);

router.get('/', protect, getAllUsers);

export default router;
