import mongoose from "mongoose";

// Sets up User Model

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    role: "surgeon" | "admin";
    createdAt: Date;
    updatedAt: Date;

}

const userSchema = new mongoose.Schema<UserDocument>({email: {type: String, unique: true, required: true}, password: {type:String, required:true}, role: {type: String, required:true}}, {timestamps: true});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
