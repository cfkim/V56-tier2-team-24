import {Router} from "express"


const userRoutes = Router()

userRoutes.get("/", (req:any, res) => {
    console.log("req.user:", req.user.email);
  res.json({
    message: "User route is working", user: req.user})
})

export default userRoutes