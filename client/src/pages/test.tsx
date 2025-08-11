import { useState } from "react";
import AddPatient from "../components/AddPatient";

export default function PatientInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="font-nunito m-10">
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
                className="bg-primary h-12 rounded-2xl px-4 text-white"
                onClick={() => setIsOpen(true)}
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
          </div>
        </div>

        <div className="relative h-screen overflow-x-auto">
          <table className="min-w-full outline">
            <thead className="bg-accent text-left">
              <tr>
                <th scope="col">Patient</th>
                <th scope="col">Street Address</th>
                <th scope="col">Country</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Delete Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <AddPatient isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
