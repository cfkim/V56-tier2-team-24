import "dotenv/config";
import { APP_ORIGIN, PORT } from "./constants/env";
import authRoutes from "./routes/auth.route";
import cors from "cors";
import userRoutes from "./routes/user.route";
import connectToDatabase from "./config/db";
import cookieParser from "cookie-parser";
import authenticate from "./middleware/authenticate";
import patientRoutes from "./routes/patient.route";

const express = require("express");
const app = express();

app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use("/patient", patientRoutes);

app.listen(PORT, async () => { await connectToDatabase(); console.log(`Server is running on port ${PORT}`); });
