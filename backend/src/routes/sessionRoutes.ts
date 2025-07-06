import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  createSession,
  updateFeedback,
  getMenteeSessions,
  getMentorSessions,
} from '../controllers/sessionController';

const router = express.Router();

router.post('/', protect, createSession);
router.put('/:id/feedback', protect, updateFeedback); // ✅ updated here
router.get('/mentee', protect, getMenteeSessions);
router.get('/mentor', protect, getMentorSessions);

export default router;
