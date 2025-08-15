import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, PORT } from "./constants/env";
import authenticate from "./middleware/authenticate";
import statusRoutes from "./routes/status.route";
import authRoutes from "./routes/auth.route";
import patientRoutes from "./routes/patient.route";
import userRoutes from "./routes/user.route";

const express = require("express");
const app = express();

app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use("/status", statusRoutes);
app.use("/patient", authenticate, patientRoutes);

app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
});
