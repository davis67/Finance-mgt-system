import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

const app = express();
const PORT = '5000';


//database connection
dotenv.config();
connectDB();

app.listen(PORT, () => console.log(`Server connected successfully on ${PORT}`))