import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import { testConnection } from './config/db-config.js';

import yearRoutes from './routes/year.route.js';
import periodRoutes from './routes/period.route.js';
import programRoutes from './routes/program.route.js';
import sectionRoutes from './routes/section.route.js';
import classListRoutes from './routes/classlist.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running!' });
});

app.use('/api/years', yearRoutes);
app.use('/api/period', periodRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/classList', classListRoutes);

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
    await testConnection();
});