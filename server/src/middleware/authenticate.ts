import { RequestHandler } from "express";

const jwt = require("jsonwebtoken");

interface Request {
    user?: any;
}

// Authenticates request before reaching endpoint
const authenticate: RequestHandler = (req, res, next) => {
    // const cookieToken = req.cookies.accessToken
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ error: "No token provided" });
    }
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
        if (err) {
            console.log("JWT verification failed:", err);
            return res.status(403).json({ error: "Invalid token" });
        } // if invalid token
        (req as Request).user = user;
        next();
    });
};

export default authenticate;
