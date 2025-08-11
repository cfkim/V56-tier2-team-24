import mongoose from "mongoose";

// Sets up RsetPassword Model which stores reset tokens

export interface ResetPasswordDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    resetToken: string;
    expiresAt: Date;
    createdAt: Date;
}

const resetPasswordSchema = new mongoose.Schema<ResetPasswordDocument>({
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    resetToken: {
        type: String, required: true
    },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true },
}
);

const ResetPasswordModel = mongoose.model<ResetPasswordDocument>("ResetPassword", resetPasswordSchema);

export default ResetPasswordModel;
