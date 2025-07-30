import { Router } from "express";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import UserModel from "../models/user.model";
import { clearAuthCookies, getAccessTokenCookieOptions, setAuthCookies } from "../utils/cookies";

// const express = require("express");
// const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// app.use(express.json());

const authRoutes = Router();

// This is a simple in-memory store for refresh tokens
let refreshTokens: string[] = [];

function generateAccessToken(user:any) {
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
      const refreshToken = jwt.sign(session_user, JWT_REFRESH_SECRET, { expiresIn: "30d" })
      
      refreshTokens.push(refreshToken);

      setAuthCookies({res, accessToken, refreshToken, rememberMe})
      
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
    const user = await UserModel.create({ email: inputEmail, password: hashedPassword, role: req.body.role });

    // Creates session (tokens)
    const session_user = { id: user._id, email: user.email};
    const accessToken = generateAccessToken(session_user);
    const refreshToken = jwt.sign(session_user, JWT_REFRESH_SECRET, { expiresIn: "30d" });
    
    // "Saves" refresh tokens in memory for testing
    // TODO: implement tokens with http cookies instead of local storage
    refreshTokens.push(refreshToken);

    // Returns the access token and refresh token
    // 201 means created
    setAuthCookies({res, accessToken, refreshToken})

    res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken });


  } catch {
    res.status(500).send();
  }
});

// -- REFRESH TOKEN HANDLER --
authRoutes.get("/refresh", async (req, res) => {
  console.log("getting refresh token form cookie")
  const cookieToken = req.cookies.refreshToken 

  const authHeader = req.headers['authorization'];
  const refreshToken = authHeader && authHeader.split(' ')[1];
  console.log("checking if null")
  if(cookieToken == null) return res.sendStatus(401); // No token provided
  if (!refreshTokens.includes(cookieToken)) return res.sendStatus(403); // Invalid token
  console.log("valid token")
  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err:any, user:any) => {
    
    if(err) return res.sendStatus(403); // Invalid token
    console.log("verify succeeded")
    const session_user = { id: user.id, email: user.email};
    const accessToken = generateAccessToken(session_user);
    console.log('trying refresh with a cookie')
    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions()).json({ accessToken: accessToken});
  })
});

// -- LOGOUT HANDLER --
authRoutes.get("/logout", async (req, res) => {
  // Removes the refresh token to effectively log out the user
  const authHeader = req.headers['authorization'];
  const refreshToken = authHeader && authHeader.split(' ')[1];
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  clearAuthCookies(res)
  res.sendStatus(204);

  
});

export default authRoutes;
