import { RequestHandler } from 'express';

const jwt = require("jsonwebtoken");

interface Request {
    user?: any;
}

// Authenticates request before reaching endpoint
const authenticate: RequestHandler = (req, res, next) => {
    // const cookieToken = req.cookies.accessToken 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if no token provided
    
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user:any) => {
        if (err) return res.sendStatus(403); // if invalid token
        (req as Request).user = user;
        next();
    });
}

export default authenticate;