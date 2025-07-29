import "dotenv/config";
import { APP_ORIGIN, PORT } from "./constants/env";
import authRoutes from "./routes/auth.route";
import cors from "cors";
import userRoutes from "./routes/user.route";
import authenticate from "./middleware/authenticate";

const express = require("express");
const app = express();
app.use(cors({ origin: APP_ORIGIN, credentials: true }));

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes)
app.listen(PORT);
