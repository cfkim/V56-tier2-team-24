import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { addPatient, editPatient, getNewPatientId } from "../../lib/api";
import type { Patient } from "../../types/Patient";
import EmailInput from "./EmailInput";
import PatientFormTextInput from "./PatientFormTextInput";
import PhoneNumberInput from "./PhoneNumberInput";

export default function PatientFormModal({
  isOpen,
  onClose,
  isEdit = false,
  fetchPatients,
  setLastAddedPatientId,
  setLastEditedPatientId,
  patient,
}: {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  fetchPatients: () => Promise<boolean>;
  setLastAddedPatientId: React.Dispatch<React.SetStateAction<string>>;
  setLastEditedPatientId: React.Dispatch<React.SetStateAction<string>>;
  patient: Patient | null;
}) {
  const [newPatientId, setNewPatientId] = useState<number>(0);

  const [errors, setErrors] = useState<{
    countryCode?: string;
    phoneNumber?: string;
    email?: string;
  }>({});
  const fetchId = async () => {
    const res = await getNewPatientId();
    setNewPatientId(res.data.patientID);
  };

  useEffect(() => {
    console.log("isEdit: ", isEdit);
    if (isOpen) {
      fetchId();
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const portal = document.getElementById("portal");
  if (!portal) return null;
  if (!isOpen) return null;

  const validateForm = (formData: any) => {
    let validationErrors: {
      countryCode?: string;
      phoneNumber?: string;
      email?: string;
    } = {};
    const countryCode = formData.get("countryCode");
    if (countryCode && !/^\+?\d{1,3}$/.test(countryCode.toString())) {
      validationErrors.countryCode = "Please enter a valid country code";
    }

    const phoneNumber = formData.get("phoneNumber");
    if (
      phoneNumber &&
      !/^\d{10}$/.test(phoneNumber.toString().replace(/\D/g, ""))
    ) {
      validationErrors.phoneNumber = "Please enter a valid phone number";
    }

    const email = formData.get("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString())) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const patientIdVal = formData.get("patientID");
    if (typeof patientIdVal === "string" && patientIdVal.startsWith("#")) {
      formData.set("patientID", patientIdVal.slice(1));
    }

    if (!validateForm(formData)) return;

    try {
      await addPatient(formData);
      if (patientIdVal) {
        setLastAddedPatientId(patientIdVal.toString());
      }
      onClose();
      fetchId();
      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEdit) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const patientIdVal = formData.get("patientID");
    if (typeof patientIdVal === "string" && patientIdVal.startsWith("#")) {
      formData.set("patientID", patientIdVal.slice(1));
    }

    if (!validateForm(formData)) return;
    try {
      await editPatient(formData);
      //   const addedPatientID = addedPatient.data.patient.patientID;
      //   if (!addedPatientID) {
      //     console.error("Missing Patient ID from added patient.");
      //     return;
      //   }
      //   setLastAddedPatientId(addedPatientID);
      if (patientIdVal) {
        setLastEditedPatientId(patientIdVal.toString());
      }
      onClose();
      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };
  return createPortal(
    <>
      <div aria-hidden="true" className="fixed inset-0 z-30 bg-[#343434]/75" />
      <div
        aria-modal="true"
        className="bg-background font-nunito no-scrollbar fixed top-20 right-0 left-0 z-50 mx-auto max-h-[calc(100vh-5rem)] w-10/12 max-w-5xl overflow-y-auto rounded-xl pb-24 shadow-xl sm:pb-10"
      >
        <div className="flex items-center justify-between border-b border-[#DDE1E6] px-10 py-5 text-base text-lg font-bold">
          <h3 className="text-[#222324]">
            {isEdit ? "Edit Patient Information" : "Add New Patient"}
          </h3>
          <button
            className="text-header-black cursor-pointer"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="34px"
              viewBox="0 -960 960 960"
              width="34px"
              fill="currentColor"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isEdit) {
                handleEditPatient(e);
              } else {
                handleAddPatient(e);
              }
            }}
            className="flex flex-col gap-2 px-10 py-5 text-sm"
          >
            <h4 className="font-bold sm:text-lg">User Details</h4>
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <input
                  type="hidden"
                  name="_id"
                  value={(patient && patient._id) || ""}
                />
                <label htmlFor="patientID">Patient Number</label>
                <input
                  id="patientID"
                  type="text"
                  name="patientID"
                  readOnly
                  required
                  value={
                    isEdit && patient ? patient.patientID : "#" + newPatientId
                  }
                  className="bg-accent pointer-events-none w-full cursor-not-allowed rounded-xl border-b border-[#C1C7CD] px-4 py-3 text-[#B5B16F]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <PatientFormTextInput
                  name="firstName"
                  isEdit={isEdit}
                  defaultValue={isEdit && patient ? patient.firstName : ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <PatientFormTextInput
                  name="lastName"
                  isEdit={isEdit}
                  defaultValue={isEdit && patient ? patient.lastName : ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="streetAddress">Street Address</label>
                <PatientFormTextInput
                  name="streetAddress"
                  defaultValue={isEdit && patient ? patient.streetAddress : ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="city">City</label>
                <PatientFormTextInput
                  name="city"
                  defaultValue={isEdit && patient ? patient.city : ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="state">State</label>
                <PatientFormTextInput
                  name="state"
                  defaultValue={isEdit && patient ? patient.state : ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="country">Country</label>
                <PatientFormTextInput
                  name="country"
                  defaultValue={isEdit && patient ? patient.country : ""}
                />
              </div>
              {isEdit && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="medicalStatus">Current Medical Status</label>
                  <input
                    type="text"
                    name="medicalStatus"
                    placeholder="Checked-In"
                    readOnly
                    value={patient?.medicalStatus}
                    className="bg-accent pointer-events-none w-full rounded-xl border-b border-[#C1C7CD] px-4 py-3 text-[#B5B16F] placeholder:text-[#B5B16F]"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2 sm:col-start-1">
                <fieldset className="flex flex-col">
                  <legend className="mb-2">Phone Number</legend>
                  <PhoneNumberInput
                    countryCodeError={errors.countryCode}
                    phoneNumberError={errors.phoneNumber}
                    defaultCountryCode={
                      isEdit && patient ? patient.countryCode : ""
                    }
                    defaultPhoneNumber={
                      isEdit && patient ? patient.phoneNumber : ""
                    }
                  />
                </fieldset>
                {errors.countryCode && (
                  <div className="text-red">{errors.countryCode}</div>
                )}
                {errors.phoneNumber && (
                  <div className="text-red">{errors.phoneNumber}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <EmailInput
                  email={isEdit && patient ? patient.email : ""}
                  emailErrors={errors.email}
                />
              </div>
              <div className="mt-6 flex gap-3 sm:col-start-1 sm:text-base">
                <button className="bg-primary text-background w-full cursor-pointer rounded-xl px-3 py-4">
                  {isEdit ? "Save Changes" : "Add Patient"}
                </button>
                <div
                  className="outline-primary flex w-full cursor-pointer items-center justify-center rounded-xl px-3 py-4 outline outline-2"
                  onClick={onClose}
                >
                  Cancel
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>,
    portal,
  );
}
