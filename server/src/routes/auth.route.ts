import { Router } from "express";
import { errorMonitor } from "node:events";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import UserModel from "../models/user.model";

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

const authRoutes = Router();

// This is a simple in-memory store for refresh tokens.
let refreshTokens: string[] = [];

function generateAccessToken(user:any) {
  console.log(user)
  return jwt.sign(user, JWT_SECRET, { expiresIn: "15s" });
}

// -- LOGIN HANDLER --
authRoutes.post("/login", async (req, res) => {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
  
  // finds user from email
  const user = await UserModel.findOne({ email: inputEmail });

  // if user does not exist, returns error
  if (user == null) {
    console.log("Could not find user");
    return res.status(401).send("Cannot find user");
  }

  try {
    // compares password with hashed password
    if (await bcrypt.compare(inputPassword, user.password)) {
      // create session (tokens)
      const session_user = { email: inputEmail, id: user._id };
      const accessToken = generateAccessToken(session_user);
      const refreshToken = jwt.sign(session_user, JWT_REFRESH_SECRET, { expiresIn: "30d" })
      
      refreshTokens.push(refreshToken);
      res.status(200).send({ session_user, accessToken, refreshToken });
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
    if(existingUser) {
      res.status(500).json({ message: "User already exists" });
    }
    
    // Creates user in db
    const user = await UserModel.create({ email: inputEmail, password: hashedPassword, role: "admin" });

    // Creates session (tokens)
    const session_user = { id: user._id, email: user.email};
    const accessToken = generateAccessToken(session_user);
    const refreshToken = jwt.sign(session_user, JWT_REFRESH_SECRET, { expiresIn: "30d" });
    
    // "saves" refresh tokens in memory for testing
    // TODO: implement with http cookies
    refreshTokens.push(refreshToken);

    // returns the access token and refresh token
    // 201 means created
    res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken });

  } catch {
    res.status(500).send();
  }
});

// -- REFRESH TOKEN HANDLER --
authRoutes.get("/refresh", async (req, res) => {
  const authHeader = req.headers['authorization'];
  const refreshToken = authHeader && authHeader.split(' ')[1];
  if(refreshToken == null) return res.sendStatus(401); // No token provided
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403); // Invalid token
  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err:any, user:any) => {
    
    if(err) return res.sendStatus(403); // Invalid token
    const accessToken = generateAccessToken({email: user.email});
    console.log("server new AT: " + accessToken)
    res.json({ accessToken: accessToken});
  })
});

authRoutes.get("/logout", async (req, res) => {
  // removes the refresh token to effectively log out the user
  const authHeader = req.headers['authorization'];
  const refreshToken = authHeader && authHeader.split(' ')[1];
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  console.log("User logged out");
  res.sendStatus(204);
});

// authRoutes.post("/password/forgot");
// authRoutes.post("/password/reset");

export default authRoutes;
