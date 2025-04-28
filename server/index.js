import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import baseUrl from './baseUrl.js';
dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: `${baseUrl}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'], 
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api',emailRoutes);
app.use('/api',fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));