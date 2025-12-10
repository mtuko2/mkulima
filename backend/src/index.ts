import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';

dotenv.config();

// Initialize Firebase Admin (mock or real based on env)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
    });
} else {
    // Initialize default for cloud environment or dev fallback
    admin.initializeApp();
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Mkulima_help Backend API is running');
});

import apiRoutes from './routes/api';

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
