import { useEffect, useState } from "react";
import PatientFormModal from "../components/PatientFormModal";
import Search from "../components/search";
import API from "../config/apiClient";
import { getPatients } from "../lib/api";
import type { Patient } from "../types/Patient";

export default function PatientInfo() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const deletePatient = async (patientID: string) => {
    console.log("deleting user attempt: " + patientID);
    const token = localStorage.getItem("accessToken");

    try {
      await API.delete("/patient/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id: patientID },
      });
      setPatients((prev) => prev.filter((p) => p.patientID !== patientID));
    } catch {
      console.log("error deleting patient");
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      const result = await getPatients();
      const patients = result.data.patients;
      setPatients(patients);
    };

    fetchPatients();
  }, []);

  return (
    <>
      <div className="font-nunito m-20">
        <div className="flex flex-col">
          <div className="mb-10 flex flex-row justify-between">
            <div className="mx-4">
              <h1 className="font-kaisei mb-5 text-3xl font-bold">
                Patient Information Dashboard
              </h1>
              <p>
                View and manage essential patient details before, during, and
                after surgery. <br></br> Please ensure all updates are accurate
                and respectful of patient privacy.
              </p>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-primary h-12 cursor-pointer rounded-2xl px-4 text-white"
              >
                Add a New Patient +
              </button>
            </div>
          </div>

          <div className="mb-4 flex flex-row justify-between">
            <div className="flex flex-row gap-8">
              <button className="">All</button>
              <button>Before Procedure</button>
              <button>During Procedure</button>
              <button>After Procedure</button>
            </div>
            <Search></Search>
          </div>
        </div>

        <div className="relative h-screen overflow-visible">
          <table className="min-w-full rounded-2xl text-lg outline-2 outline-gray-100">
            <thead className="bg-accent font-nunito-bold h-12 text-left">
              <tr>
                <th className="pl-5" scope="col">
                  Patient
                </th>
                <th scope="col">Street Address</th>
                <th scope="col">Country</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email Address</th>
                <th scope="col">Medical Status</th>
                <th scope="col">Delete Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr className="border-b-1 border-gray-200" key={patient._id}>
                  <td className="px-5 py-3 pr-50">
                    <div className="flex flex-col">
                      <div className="font-nunito-bold">
                        {patient.firstName} {patient.lastName}
                      </div>
                      <div className="text-md text-gray-500">
                        Patient No: {patient.patientID}
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{patient.streetAddress}</td>
                  <td className="py-3 pr-15">{patient.country}</td>
                  <td className="py-3">{patient.phoneNumber}</td>
                  <td className="py-3">{patient.email}</td>
                  <td className="py-3">{patient.medicalStatus}</td>
                  <td className="py-3">
                    <button onClick={() => deletePatient(patient.patientID)}>
                      ...
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PatientFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
