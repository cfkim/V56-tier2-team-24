import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { addPatient, getNewPatientId } from "../lib/api";

export default function PatientFormModal({
  isOpen,
  onClose,
  isEdit = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
}) {
  const [newPatientId, setNewPatientId] = useState<number>(0);
  const [errors, setErrors] = useState<{
    countryCode?: string;
    phoneNumber?: string;
    email?: string;
  }>({});

  useEffect(() => {
    async function fetchId() {
      const res = await getNewPatientId();
      setNewPatientId(res.data.patientID);
    }
    fetchId();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

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
    console.log("add patient");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const isValid = validateForm(formData);
    if (isValid) {
      try {
        const addedPatient = await addPatient(formData);
        console.log("addedPatient");
        console.log(addedPatient.data);
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(errors);
    }
  };
  const handleEditPatient = async (e: React.FormEvent) => {
    console.log("edit patient");
    e.preventDefault;
    const formData = new FormData(e.target as HTMLFormElement);
    const isValid = validateForm(formData);
    if (isValid) {
      console.log(formData);
      try {
        const addedPatient = await addPatient(formData);
        console.log("addedPatient");
        console.log(addedPatient);
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(errors);
    }
  };
  return createPortal(
    <>
      <div aria-hidden="true" className="fixed inset-0 z-30 bg-black/40" />
      <div
        aria-modal="true"
        className="bg-background font-nunito no-scrollbar fixed top-20 right-0 left-0 z-50 mx-auto max-h-[calc(100vh-5rem)] w-10/12 overflow-y-auto rounded-xl pb-10 pb-24 shadow-xl"
      >
        <div className="align-center flex justify-between border-b border-[#DDE1E6] px-10 py-5 text-base text-lg font-bold">
          <h3 className="text-[#222324]">Add new Patient</h3>
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
            <h4 className="text-base font-bold">User Details</h4>
            <label htmlFor="patientID">Patient Number</label>
            <input
              type="text"
              name="patientID"
              disabled
              required
              value={isEdit ? "123456" : newPatientId}
              className="bg-accent w-full rounded-xl border-b border-[#C1C7CD] px-4 py-3 text-[#B5B16F]"
            />
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Jane"
              required
              maxLength={20}
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              required
              maxLength={20}
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]"
            />
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              placeholder="123 Main St"
              required
              maxLength={50}
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]"
            />
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              placeholder="Springfield"
              required
              maxLength={20}
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]"
            />
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              placeholder="California"
              required
              maxLength={20}
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]"
            />
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              placeholder="United States"
              required
              maxLength={20}
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]"
            />
            {isEdit && (
              <>
                <label htmlFor="currentMedicalStatus">
                  Current Medical Status
                </label>
                <input
                  type="text"
                  name="currentMedicalStatus"
                  placeholder="Checked-In"
                  className="bg-accent w-full rounded-xl border-b border-[#C1C7CD] px-4 py-3 placeholder:text-[#B5B16F]"
                />
              </>
            )}

            <fieldset className="flex flex-col gap-2">
              <legend>Phone Number</legend>
              <div className="flex gap-2">
                <input
                  type="tel"
                  id="countryCode"
                  name="countryCode"
                  placeholder="+999"
                  required
                  inputMode="tel"
                  maxLength={4}
                  className="w-20 min-w-0 rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-1 py-3 text-center placeholder:text-[#697077]"
                />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="123-456-7890"
                  required
                  inputMode="tel"
                  maxLength={14}
                  className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]"
                />
              </div>
            </fieldset>
            {errors.countryCode && (
              <div className="text-red">{errors.countryCode}</div>
            )}
            {errors.phoneNumber && (
              <div className="text-red">{errors.phoneNumber}</div>
            )}
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="c7TlG@example.com"
              required
              inputMode="email"
              maxLength={50}
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder:text-[#697077]"
            />
            {errors.email && <div className="text-red">{errors.email}</div>}
            <div className="mt-6 flex gap-3">
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
          </form>
        </div>
      </div>
    </>,
    portal,
  );
}
