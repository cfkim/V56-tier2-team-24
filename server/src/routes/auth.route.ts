import { Router } from "express";
import { errorMonitor } from "node:events";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
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
const users: User[] = [];
let refreshTokens: string[] = [];

authRoutes.get("/users", (req, res) => {
  res.json(users);
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
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, JWT_REFRESH_SECRET);
      refreshTokens.push(refreshToken);
      console.log("signign in");
      res
        .status(200)
        .send({
          session_user: session_user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
    } else {
      console.log("wrong password");
      res.status(401).send("invalid password");
    }
  } catch {
    res.status(500).send("auth failed");
  }
});

function generateAccessToken(user: User) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "15m" });
}

authRoutes.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { email: req.body.email, password: hashedPassword };
    users.push(user);

    // get tokens
    const email = req.body.email;
    const session_user = { email: email };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, JWT_REFRESH_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch {
    res.status(500).send();
  }
});

authRoutes.get("/refresh", async (req, res) => {
  const refreshToken = req.body.token;
  if(refreshToken == null) return res.sendStatus(401); // No token provided
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403); // Invalid token
  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err:any, user:any) => {
    if(err) return res.sendStatus(403); // Invalid token
    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken});
  })
});

authRoutes.get("/logout", async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});
// authRoutes.post("/password/forgot");
// authRoutes.post("/password/reset");

export default authRoutes;
