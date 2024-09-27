import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ownersRoute from './routes/owners';  // Import owner routes

dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log('MongoDB connected...');
        app.listen(port, host, () => {
            console.log(`[ ready ] http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Use the owner routes
app.use('/owners', ownersRoute);

// Basic Route for Testing
app.get('/', (req, res) => {
    res.send('Welcom to edudish\'s auth-service');
});
