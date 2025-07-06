import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import requestRoutes from './routes/requestRoutes';
import sessionRoutes from './routes/sessionRoutes';
import adminRoutes from './routes/adminRoutes';
import availabilityRoutes from './routes/availabilityRoutes';




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/requests', requestRoutes);
app.use('/sessions', sessionRoutes);
app.use('/admin', adminRoutes);
app.use('/availability', availabilityRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});


export default app;
