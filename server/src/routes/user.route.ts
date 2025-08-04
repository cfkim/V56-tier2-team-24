import {Router} from "express"
import UserModel from "../models/user.model"

const userRoutes = Router()

// -- USER PROFILE ---
// Fetches user model object
userRoutes.get("/", async (req:any, res)=> {
  // Finds user from id
  const user = await UserModel.findById(req.user.id)
  
  if(user){
    res.status(200).json({
      message: "User route is working", user: user})
  }
  
})

export default userRoutes