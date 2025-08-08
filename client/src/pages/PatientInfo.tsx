import { useEffect, useState } from "react";
import { getPatients } from "../lib/api";
import Search from "../components/search";
import API from "../config/apiClient";

export default function PatientInfo() {
    const [patients, setPatients] = useState([])
    
    const deletePatient = async (patientID: string) => {

        console.log("deleting user attempt: " + patientID)
        const token = localStorage.getItem("accessToken");
        
        try{ 
            await API.delete("/patient/delete", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { id: patientID },
            });
            setPatients(prev => prev.filter(p => p.patientID !== patientID));
        }catch{
            console.log("error deleting patient")
        }
      }

    useEffect(() => {
        const fetchPatients = async () => {
            const result = await getPatients()
            const patients = result.data.patients
            setPatients(patients)
            
        }

        fetchPatients();
        
    }, [])
    
    return <>
    <div className="m-10 font-nunito">
        <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-10">
                <div className="mx-4">
                    <h1 className="text-3xl font-kaisei font-bold mb-5">Patient Information Dashboard</h1>
                    <p>View and manage essential patient details before, during, and after surgery. <br></br> Please ensure all updates are accurate and respectful of patient privacy.</p>
                </div>
                <div className="flex items-end">
                    <button className="bg-primary text-white px-4 rounded-2xl h-12">Add a New Patient +</button>
                </div>
                
            </div>

            <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-row gap-8">
                    <button className="">
                        All
                    </button>
                    <button>
                        Before Procedure
                    </button>
                    <button>
                        During Procedure
                    </button>
                    <button>
                        After Procedure
                    </button>
                </div>
                <Search></Search>
            </div>
        </div>
        
        <div className="h-screen relative overflow-x-auto">
            <table className="min-w-full outline">
                <thead className="bg-accent text-left">
                    <tr>
                        <th scope="col">
                            Patient
                        </th>
                        <th scope="col">
                            Street Address
                        </th>
                        <th scope="col">
                            Country
                        </th>
                        <th scope="col">
                            Phone Number
                        </th>
                        <th scope="col">
                            Email Address
                        </th>
                        <th scope="col">
                            Phone Number
                        </th>
                        <th scope="col">
                            Delete Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr className="outline outline-gray-400" key={patient._id}>
                            <td><div className="flex flex-col"><div className="font-bold">{patient.firstName} {patient.lastName}</div>{patient.patientID}</div></td>
                            <td>{patient.streetAddress}</td>
                            <td>{patient.country}</td>
                            <td>{patient.phoneNumber}</td>
                            <td>{patient.email}</td>
                            <td>{patient.medicalStatus}</td>
                            <td><button onClick={() => deletePatient(patient.patientID)}>X</button></td>
                            
                        </tr>

                    ))}
                </tbody>
            </table>
            
        </div>
    </div>
        
    </>
}