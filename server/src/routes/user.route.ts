import {Router} from "express"
import UserModel from "../models/user.model"

const userRoutes = Router()

// userRoutes.get("/", (req:any, res) => {
//   console.log("req.user:", req.user.email);
//   res.json({
//     message: "User route is working", user: req.user})
// })

userRoutes.get("/", async (req:any, res)=> {
  // finds user from id
  const user = await UserModel.findById(req.user.id)
  console.log("found: " + user)
  if(user){
    res.status(200).json({
      message: "User route is working", user: user})
  }
  
})
export default userRoutes