import { RequestHandler } from 'express';

const jwt = require("jsonwebtoken");

interface Request {
    user?: any;
}

const authenticate: RequestHandler = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // No token provided
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user:any) => {
        if (err) return res.sendStatus(403); // Invalid token
        (req as Request).user = user;
        next();
    });
}

export default authenticate;