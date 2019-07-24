import jwt from 'jsonwebtoken';

const token = (req, res, next) => {
    //get the token

    const token = req.header('x-auth-token');

    //check if no token
    if (!token) {
        return res.status(401).json({
            error: 'No token, authorisation denied || Token has already expired'
        })
    }
    //verify token 
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        next();

    } catch (error) {
        console.error(error.message);
        res.status(401).json({
            error: 'TOKEN is Invalid'
        })
    }
};

export default token;