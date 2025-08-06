import "dotenv/config";
import { APP_ORIGIN, PORT } from "./constants/env";
import authRoutes from "./routes/auth.route";
import cors from "cors";
import passwordRoutes from "./routes/password.route";
import userRoutes from "./routes/user.route";
import connectToDatabase from "./config/db";
import cookieParser from "cookie-parser";
import authenticate from "./middleware/authenticate";

import express from "express";
const app = express();

app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use(express.json());

// Health check endpoint
app.get("/health", (req: express.Request, res: express.Response) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.use("/auth", authRoutes);
app.use("/password", passwordRoutes);
app.use("/user", authenticate, userRoutes);

app.listen(PORT, async () => { 
  // await connectToDatabase(); // Temporarily disabled for testing
  console.log(`Server is running on port ${PORT}`); 
});
