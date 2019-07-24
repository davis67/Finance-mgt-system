import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import users from './users/routes';
import auth from './auth/routes';
const app = express();
const PORT = '9000';


//database connection
dotenv.config();
connectDB();

//body parser
app.use(express.json());

//connect with routes
app.use('/users', users);
app.use('/auth', auth);

app.listen(PORT, () => console.log(`Server connected successfully on ${PORT}`))