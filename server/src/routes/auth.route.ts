import { Router } from "express";
import { APP_ORIGIN, JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import UserModel from "../models/user.model";
import ResetPasswordModel from "../models/resetPassword.model";
import crypto from 'crypto';

import {
    clearAuthCookies,
    getAccessTokenCookieOptions,
    setAuthCookies,
} from "../utils/cookies";
import { sendPasswordResetEmail } from "../utils/emailService";

// const express = require("express");
// const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// app.use(express.json());

const authRoutes = Router();

// This is a simple in-memory store for refresh tokens
let refreshTokens: string[] = [];
let resetTokens = new Map();

function generateAccessToken(user: any) {
    return jwt.sign(user, JWT_SECRET, { expiresIn: "15s" });
}

// -- LOGIN HANDLER --
authRoutes.post("/login", async (req, res) => {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;
    const rememberMe = req.body.rememberMe;

    // finds user from email
    const user = await UserModel.findOne({ email: inputEmail });

    // if user does not exist, returns error
    if (user == null) {
        return res.status(401).send("Cannot find user");
    }

    try {
        // compares password with hashed password
        if (await bcrypt.compare(inputPassword, user.password)) {
            // create session (tokens)
            const session_user = { email: inputEmail, id: user._id };
            const accessToken = generateAccessToken(session_user);
            const refreshToken = jwt.sign(session_user, JWT_REFRESH_SECRET, {
                expiresIn: "30d",
            });

            refreshTokens.push(refreshToken);

            setAuthCookies({ res, accessToken, refreshToken, rememberMe });

            res.status(200).send({ user, accessToken, refreshToken });
        } else {
            // if password does not match, returns error
            res.status(401).send("invalid password");
        }
    } catch {
        // if compare fails
        res.status(500).send("auth failed");
    }
});

// -- REGISTER HANDLER --
authRoutes.post("/register", async (req, res) => {
    try {
        // Gets email and password from request body and hashes password
        const inputEmail = req.body.email;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Checks if user exists in db
        const existingUser = await UserModel.exists({ email: inputEmail });
        if (existingUser) {
            res.status(500).json({ message: "User already exists" });
        }

        // Creates user in db
        const user = await UserModel.create({
            email: inputEmail,
            password: hashedPassword,
            role: req.body.role,
        });

        // Creates session (tokens)
        const session_user = { id: user._id, email: user.email };
        const accessToken = generateAccessToken(session_user);
        const refreshToken = jwt.sign(session_user, JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });

        // "Saves" refresh tokens in memory for testing
        // TODO: implement tokens with http cookies instead of local storage
        refreshTokens.push(refreshToken);

        // Returns the access token and refresh token
        // 201 means created
        setAuthCookies({ res, accessToken, refreshToken });

        res.status(201).json({
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch {
        res.status(500).send();
    }
});

// -- REFRESH TOKEN HANDLER --
authRoutes.get("/refresh", async (req, res) => {
    const cookieToken = req.cookies.refreshToken;
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (cookieToken == null) return res.sendStatus(401); // No token provided
    if (!refreshTokens.includes(cookieToken)) return res.sendStatus(403); // Invalid token
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403); // Invalid token
        const session_user = { id: user.id, email: user.email };
        const accessToken = generateAccessToken(session_user);
        res.cookie(
            "accessToken",
            accessToken,
            getAccessTokenCookieOptions()
        ).json({ accessToken: accessToken });
    });
});

// -- LOGOUT HANDLER --
authRoutes.get("/logout", async (req, res) => {
    // Removes the refresh token to effectively log out the user
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    clearAuthCookies(res);
    res.sendStatus(204);
});

export default authRoutes;

// -- PASSWORD RESET HANDLERS --
// this sends the email with reset link
authRoutes.post('/password/forgot', async(req, res) => {
    console.log("here at forgot")
    try {
        const email = req.body.email
        console.log(email)
        // finds user from email
        const user = await UserModel.findOne({ email: email });

            // if user does not exist, returns error
        if (user == null) {
            return res.status(404).send("Cannot find user");
        }
        
        // generates reset token and hashes it
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken, 10)
        
        // sets token expiration data
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        const resetPassword = await ResetPasswordModel.create({
            userId: user._id,
            resetToken: hashedToken,
            expiresAt: expiresAt
        })

        // Creates reset url
        const resetUrl = `${APP_ORIGIN}/password/reset?code=${resetPassword._id}&exp=${expiresAt}&uid=${user._id}`;
        
        // Send email using Gmail
        let emailSent = false;
        
        console.log('Attempting to send password reset email to:', email);
        if (process.env.EMAIL_SERVICE === 'gmail' && process.env.EMAIL_USER) {
            emailSent = await sendPasswordResetEmail(email, resetUrl);
            console.log('Gmail email attempt:', emailSent ? 'success' : 'failed');
        }
        console.log('email was sent')
        if (!emailSent) {
            // In development mode, return the reset URL directly for testing
            if (process.env.NODE_ENV === 'development') {
            return res.json({ 
                message: 'Password reset link generated successfully (development mode)',
                email: email,
                resetUrl: resetUrl, // Only in development
                note: 'Email service not configured. Use the reset URL above for testing.'
            });
            }
            return res.status(500).json({ error: 'Failed to send reset email' });
        }else{
            res.status(200).json({message: `password link successfully sent to ${email}`})
        }

    }catch (error){
        console.error('Could not send email error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//this verifies the reset token and updates the password
authRoutes.post('/password/reset', async(req, res) => {
    console.log(req.body)
    try {
        const code = req.body.code
        const uid = req.body.uid
        const new_password = req.body.password

        // find the reset object from url code
        const valid = await ResetPasswordModel.findOne({_id: code, expiresAt: {$gt: new Date()}})

        if(valid){
            console.log('found user and valid')
            const hashed_new_password = await bcrypt.hash(new_password, 10);
            console.log(valid)
            // updates user password
            const updatedUser = await UserModel.findByIdAndUpdate(valid.userId, {
                password: hashed_new_password
            })

            // removes reset token from db
            await valid.deleteOne()
            res.status(200).json({message: "successfully updated password"})

        }else{
            res.status(400).json({ error: 'Invalid or expired code' });
        }
        

    }catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// this automatically checks if the code has expired
authRoutes.post('/password/verify', async(req, res) => {
    console.log(req.body)
    try{
        const code = req.body.code
        const uid = req.body.uid
        console.log("here at verify token")
        console.log(`Code: ${code}, uid: ${uid}`)
        // find the reset object from url code
        const valid = await ResetPasswordModel.findOne({userId: uid, _id: code, expiresAt: {$gt: new Date()}})
        console.log(valid)
        if(valid){
            res.status(200).json({ message: 'Token is valid' });
        }else{
            res.status(400).json({ error: 'Invalid or expired code' });
        }
        
    }catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})