import { Router, Request, Response, NextFunction } from "express";
import PatientModel from "../models/patient.model";

const patientRoutes = Router();

// Extend Request interface for our custom properties
interface CustomRequest extends Request {
  patientId?: string;
  newStatus?: string;
}

// Validation middleware
const validatePatientId = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { patientId } = req.params;
  
  if (!patientId || typeof patientId !== 'string' || patientId.trim().length === 0) {
    return res.status(400).json({
      message: "Valid patient ID is required"
    });
  }
  
  req.patientId = patientId.trim();
  next();
};

const validateStatusUpdate = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { patientId, newStatus } = req.body;
  console.log(newStatus)
  if (!patientId || typeof patientId !== 'string' || patientId.trim().length === 0) {
    return res.status(400).json({
      message: "Valid patient ID is required"
    });
  }

  if (!newStatus || typeof newStatus !== 'string') {
    return res.status(400).json({
      message: "Valid new status is required"
    });
  }

  // Validate status values
  const validStatuses = [
    "checked-in",
    "pre-procedure", 
    "in-progress",
    "closing",
    "recovery",
    "complete",
    "dissmissal"
  ];

  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({
      message: "Invalid status value"
    });
  }

  req.patientId = patientId.trim();
  req.newStatus = newStatus;
  next();
};

// gets a specific patient records
patientRoutes.get("/", async (req: any, res) => {
    const patient = await PatientModel.findOne({
        patientID: req.body.patientID,
    });

    if (patient) {
        res.status(200).json({
            message: "Patient found",
            patient: patient,
        });
    } else {
        res.status(404).json({
            message: "could not find patient record with that ID",
        });
    }
});

// gets all patient records
patientRoutes.get("/all", async (req: any, res) => {
    const allPatients = await PatientModel.find({}).sort({ createdAt: -1 });

    if (allPatients) {
        res.status(200).json({
            message: "Patients found",
            patients: allPatients,
        });
    } else {
        res.status(500).json({
            message: "Error occurred while fetching patient data",
        });
    }
});

function createRandomString(length: number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// gets available patient number
patientRoutes.get("/patientId", async (_req: any, res) => {
    try {
        let newNumber;
        let existingNumber: any = {};
        while (existingNumber) {
            newNumber = createRandomString(6);
            existingNumber = await PatientModel.exists({
                patientID: newNumber,
            });
        }
        res.status(200).json({
            message: "New patient number generated",
            patientID: newNumber,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred while generating patient number",
        });
    }
});

// creates patient record
patientRoutes.post("/create", async (req, res) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const streetAddress = req.body.streetAddress;
        const city = req.body.city;
        const state = req.body.state;
        const country = req.body.country;
        const patientID = req.body.patientID;
        const countryCode = req.body.countryCode;
        const phoneNumber = req.body.phoneNumber;

        const existingPatient = await PatientModel.exists({
            patientID: patientID,
        });

        if (existingPatient) {
            res.status(500).json({
                message: "patient record already exists with that patient id",
            });
        }

        const patient = await PatientModel.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            streetAddress: streetAddress,
            city: city,
            state: state,
            country: country,
            patientID: patientID,
            countryCode: countryCode,
            phoneNumber: phoneNumber,
        });

        res.status(201).json({
            message: "patient successfully created",
            patient: patient,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create patient record",
            error: error instanceof Error ? error.message : error,
        });
    }
});

// deletes patient record
patientRoutes.delete("/delete", async (req, res) => {
    const idToDelete = req.body.id;
    try {
        const result = await PatientModel.deleteOne({ patientID: idToDelete });

        if (result.deletedCount === 0) {
            return res
                .status(404)
                .json({ message: "No record with ID to delete" });
        }

        res.status(200).json({
            message: "Patient record successfully deleted",
        });
    } catch {
        res.status(404).json({ message: "Could not delete user." });
    }
});

// updates patient record
patientRoutes.post("/update", async (req, res) => {
    const { _id: id, ...updatedInfo } = req.body;
    const patient = await PatientModel.findById(id);

    if (!patient) {
        return res.status(401).send("could not find user");
    }

    try {
        patient.set(updatedInfo);
        await patient.save();
        res.status(200).json({ message: "Successfully updated patient info" });
    } catch {
        res.status(500).json({ message: "Could not update" });
    }
});

// updates patient status. specifically
patientRoutes.post("/update-status", validateStatusUpdate, async (req: CustomRequest, res: Response) => {
  try {
    // Find and update the patient
    const patient = await PatientModel.findOneAndUpdate(
      { patientID: req.patientId },
      { medicalStatus: req.newStatus },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }

    res.status(200).json({
      message: "Patient status updated successfully",
      patient: {
        id: patient.patientID,
        currentStatus: patient.medicalStatus
      }
    });
  } catch (error) {
    console.error("Error updating patient status:", error);
    res.status(500).json({
      message: "Failed to update patient status",
      error: error instanceof Error ? error.message : error
    });
  }
});

// gets patient by ID from URL params
patientRoutes.get("/:patientId", validatePatientId, async (req: CustomRequest, res: Response) => {
  try {
    const patient = await PatientModel.findOne({
      patientID: req.patientId,
    });

    if (patient) {
      res.status(200).json({
        message: "Patient found",
        patient: {
          id: patient.patientID,
          currentStatus: patient.medicalStatus,
          firstName: patient.firstName,
          lastName: patient.lastName
        },
      });
    } else {
      res.status(404).json({
        message: "Patient not found",
      });
    }
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({
      message: "Error occurred while fetching patient data",
    });
  }
});

export default patientRoutes;
