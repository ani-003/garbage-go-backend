import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import ongoingRoutes from './routes/ongoingRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());
app.use(morgan('dev'));

// Load truck schedule JSON
const schedulePath = path.resolve('data/truck_schedule.json');
let scheduleData = {};

if (fs.existsSync(schedulePath)) {
  scheduleData = JSON.parse(fs.readFileSync(schedulePath, 'utf-8'));
} else {
  console.error('❌ truck_schedule.json not found at:', schedulePath);
}

// In-memory tracker for truck status at each landmark
const truckLandmarkState = {};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes(scheduleData, truckLandmarkState));
app.use('/api', ongoingRoutes(scheduleData));

// Base Route
app.get('/', (req, res) => {
  res.send('🚀 GarbageGo Server is running...');
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ GarbageGo Collector Server running at: http://localhost:${PORT}`);
});
