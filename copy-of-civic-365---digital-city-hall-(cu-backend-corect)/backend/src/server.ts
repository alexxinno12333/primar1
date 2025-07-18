
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import apiRoutes from './api';

const app: Express = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies, with a higher limit for images
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Simple health check route
app.get('/', (req: Request, res: Response) => {
    res.send('Civic 365 Backend is running!');
});

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});