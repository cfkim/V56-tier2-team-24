import { Router } from "express";
import PatientModel from "../models/patient.model";

const patientRoutes = Router();

// gets a specific patient records
patientRoutes.get('/', async(req:any, res) => {
    const patient = await PatientModel.findOne({patientID: req.body.patientID})

    if(patient){
        res.status(200).json({
            message:"Patient found",
            patient: patient
        })
    }else{
        res.status(404).json({message: "could not find patient record with that ID"})
    }
})

// gets all patient records
patientRoutes.get('/all', async(req:any, res) => {
    const allPatients = await PatientModel.find({})

    if(allPatients){
        res.status(200).json({
            message:"Patients found",
            patients: allPatients
        })
    }
})

// creates patient record
patientRoutes.post('/create', async(req, res) => {
    try{
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const streetAddress = req.body.streetAddress
        const country = req.body.country
        const patientID = req.body.patientID
        const phoneNumber = req.body.phoneNumber

        const existingPatient = await PatientModel.exists({email: email})
        console.log(existingPatient)
        if(existingPatient) {
            res.status(500).json({message: "patient record already exists with that patient id"})
        }

        const patient = await PatientModel.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            streetAddress: streetAddress,
            country: country,
            patientID: patientID,
            phoneNumber: phoneNumber,
        })

        res.status(201).json({message: "patient successfully created"})
    }catch{
        res.status(500).json({message: "failed to create patient record"})
    }
    
})

// deletes patient record
patientRoutes.delete('/delete', async (req, res) => {
    const idToDelete = req.body.id
    try {
        await PatientModel.deleteOne({patientID: idToDelete})
        res.status(200).json({message: "Patient record successfully deleted"})
    }catch {
        res.status(404).json({message: "Could not delete user."})
    }
})

// updates patient record
patientRoutes.post('/update', async (req, res) => {
    const updatedInfo = req.body.updates
    const id = req.body.id
    const patient = await PatientModel.findById(id)

    if (patient == null) {
        return res.status(401).send("could not find user")
    }

    try {
        patient.set(updatedInfo)
        await patient.save()
        res.status(200).json({message: "Successfully updated patient info"})
    }catch{
        res.status(500).json({message:"Could not update"})
    }
})

// updates patient status

export default patientRoutes;