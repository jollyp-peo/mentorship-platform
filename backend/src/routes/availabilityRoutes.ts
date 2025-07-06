import express from 'express';
import { getMentorAvailability, addAvailability, getOwnAvailability } from '../controllers/availabilityController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', protect, getMentorAvailability);
router.post('/', protect, addAvailability);
router.get('/', protect, getOwnAvailability);

export default router;
