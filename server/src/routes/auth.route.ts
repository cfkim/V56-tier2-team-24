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

interface User {
  email: string;
  password: string;
}

// testing
let users: User[] = [];
let refreshTokens: string[] = [];

authRoutes.get("/users", (req, res) => {
  res.json(users);
});

authRoutes.delete("/users/delete", (req, res) => {
  users = []
  res.status(200).json({message: "success deleted"})
});

authRoutes.post("/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);

  if (user == null) {
    console.log("sending null user found");
    return res.status(401).send("Cannot find user");
  }

  try {
    console.log("made it here");
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log("getting tokens");
      // get tokens
      const email = req.body.email;
      const session_user = { email: email };
      const accessToken = generateAccessToken(session_user);
      const refreshToken = jwt.sign(user, JWT_REFRESH_SECRET);
      refreshTokens.push(refreshToken);
      console.log("signign in with: " + accessToken);
      console.log(refreshTokens)
      res.status(200).send({ session_user, accessToken, refreshToken });
    } else {
      console.log("wrong password");
      res.status(401).send("invalid password");
    }
  } catch {
    res.status(500).send("auth failed");
  }
});

function generateAccessToken(user:any) {
  console.log(user)
  return jwt.sign(user, JWT_SECRET, { expiresIn: "15s" });
}

authRoutes.post("/register", async (req, res) => {
  try {
    console.log('try')
    // Gets email and password from request body and hashes password
    const inputEmail = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Checks if user exists in db
    const existingUser = await UserModel.exists({ email: inputEmail });
    if(existingUser) {
      throw new Error("User already exists");
    }
    
    // Creates user in db
    const user = await UserModel.create({ email: inputEmail, password: hashedPassword });

    // Creates session (tokens)
    const session_user = { email: inputEmail };
    const accessToken = generateAccessToken(session_user);
    const refreshToken = jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: "30d" });
    
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

authRoutes.get("/refresh", async (req, res) => {
  console.log("refreshinf")
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
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  console.log(refreshTokens)
  res.sendStatus(204);

});

// authRoutes.post("/password/forgot");
// authRoutes.post("/password/reset");

export default authRoutes;
