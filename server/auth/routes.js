import express from 'express';

//decrypting the password
import bcrypt from 'bcryptjs';

//Grants access to the user-used in the authentication
import jwt from 'jsonwebtoken';
import User from '../users/model';
import authcheck from './authCheck';

const router = express.Router();

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                error: 'Invalid email address provided'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid password provided'
            })
        }

        const payload = {
            user: {
                id: user_id
            }
        };

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3600000
        }, (error, token) => {
            if (error) throw error;
            res.json({
                token
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
});

router.get('/authenticated', authcheck, async (req, res) => {
    try {
        const user = await User.findById(req, user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server error');
    }
});

export default router;