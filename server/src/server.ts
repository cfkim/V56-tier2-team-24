import "dotenv/config";
import { APP_ORIGIN, PORT } from "./constants/env";
import authRoutes from "./routes/auth.route";
import cors from "cors";

const express = require("express");
const app = express();
app.use(cors({ origin: APP_ORIGIN, credentials: true }));

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT);
