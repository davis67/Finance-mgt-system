import express from 'express';

//encrypting the password
import bcrypt from 'bcryptjs';
import User from './model';


const router = express.Router();

router.post('/register', async (req, res) => {
    const {
        name,
        email,
        password,
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                error: 'User already exists with that email address'
            });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json({
            message: 'User Registered Sucessfully'
        })

    } catch (error) {
        console.error(error.message)
    }
});