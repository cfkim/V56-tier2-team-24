import { Router } from "express";
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRoutes = Router();

interface User {
  email: string;
  password: string;
}
// testing
const users = [{ email: "cat@eye.com", password: "love" }];
authRoutes.get("/users", (req, res) => {
  res.json(users);
});

authRoutes.post("/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log("yay");
      res.send("Success");
    } else {
      console.log("boo");
      res.send("Not allowed");
    }
  } catch {
    res.status(500).send();
  }
});

authRoutes.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { email: req.body.email, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

// authRoutes.get("/refresh");
// authRoutes.get("/logout");
// authRoutes.post("/password/forgot");
// authRoutes.post("/password/reset");

export default authRoutes;
