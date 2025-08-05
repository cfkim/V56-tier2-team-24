import mongoose from "mongoose";
import { StringLiteral } from "typescript";

// Sets up Patient Model

export interface PatientDocument extends mongoose.Document {
    firstName: string;
    lastName: string;
    patientID: string;
    streetAddress: string;
    country: string
    phoneNumber: string;
    email: string;
    medicalStatus: string;
    createdAt: Date;
    updatedAt: Date;
}

const patientSchema = new mongoose.Schema<PatientDocument>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    patientID: {type: String, unique: true, required: true},
    streetAddress: {type: String, required: true},
    country: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    medicalStatus: {type: String, default: "checked in"}
}, {timestamps: true})

const PatientModel = mongoose. model<PatientDocument>("Patient", patientSchema)

export default PatientModel;