import { Router } from "express";
import UserModel from "../models/user.model";

const userRoutes = Router();

// -- USER PROFILE ---
// Fetches user model object
userRoutes.get("/", async (req: any, res) => {
    try {
        // Finds user from id
        if (!req.user?.id) {
            return res
                .status(401)
                .json({ code: "UNAUTHORIZED", message: "No user on request" });
        }
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res
                .status(404)
                .json({ code: "USER_NOT_FOUND", message: "User not found" });
        }
        if (user) {
            res.status(200).json({
                message: "User route is working",
                user: user,
            });
        }
    } catch (error) {
        res.status(500).json({ code: "SERVER_ERROR", message: error });
    }
});

export default userRoutes;
