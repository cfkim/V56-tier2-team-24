import { Router } from "express";
import PatientModel from "../models/patient.model";

const statusRoutes = Router()

statusRoutes.get("/", async(req, res) => {
    const statusList = await PatientModel.find({}).select('_id patientID medicalStatus')

    if(statusList) {
        res.status(200).json({message:"successfully fetched status list", statusList: statusList})
    }else {
        res.status(404).json({message: "could not retrieve status list"})
    }
})

export default statusRoutes;