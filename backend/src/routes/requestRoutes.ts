import express from 'express';
import {
  createRequest,
  getSentRequests,
  getReceivedRequests,
  respondToRequest,
  updateRequestStatus
} from '../controllers/requestController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, createRequest);
router.get('/sent', protect, getSentRequests);
router.get('/received', protect, getReceivedRequests);
router.put('/:id', protect, respondToRequest);
router.put('/:id', protect, updateRequestStatus);


export default router;
