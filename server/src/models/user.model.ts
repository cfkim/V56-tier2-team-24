import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    role: "surgeon" | "admin";
    createdAt: Date;
    updatedAt: Date;

}

const userSchema = new mongoose.Schema<UserDocument>({email: {type: String, unique: true, required: true}, password: {type:String, required:true}, role: {type: String, required:true}}, {timestamps: true});

// userSchema.pre("save", async function (next){
//     // this will hash the password before user saved
// })

// userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
//     // this will compare the password with the hashed password
//     return true; // replace with actual comparison logic
// }   

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
