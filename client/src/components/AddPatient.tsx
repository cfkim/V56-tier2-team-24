import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function AddPatient({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const portal = document.getElementById("portal");
  if (!portal) return null;
  if (!isOpen) return null;

  const handleAddpatient = () => {
    console.log("add patient");
  };
  return createPortal(
    <>
      <div aria-hidden="true" className="fixed inset-0 z-30 bg-black/40" />
      <div
        aria-modal="true"
        className="bg-background font-nunito no-scrollbar fixed top-20 right-0 left-0 z-50 mx-auto max-h-[calc(100vh-5rem)] w-10/12 overflow-y-auto rounded-xl pb-10 pb-24 shadow-xl"
      >
        <div className="border-b border-[#DDE1E6] text-base text-lg font-bold">
          <h3 className="px-10 py-5 text-[#222324]">Add new Patient</h3>
        </div>
        <div>
          <form
            action={handleAddpatient}
            className="flex flex-col gap-2 px-10 py-5 text-sm"
          >
            <h4 className="text-base font-bold">User Details</h4>
            <label htmlFor="patientNumber">Patient Number</label>
            <input
              type="text"
              name="patientNumber"
              disabled
              placeholder="#WR3D5T"
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
            />
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Jane"
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
            />
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              placeholder="123 Main St"
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
            />
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              placeholder="New York"
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
            />
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
            />
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              placeholder="United States"
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
            />
            <label htmlFor="currentMedicalStatus">Current Medical Status</label>
            <input
              type="text"
              name="currentMedicalStatus"
              placeholder="Healthy"
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
            />
            <fieldset className="flex flex-col gap-2">
              <legend>Phone Number</legend>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="countryCode"
                  name="countryCode"
                  placeholder="+999"
                  className="w-20 min-w-0 rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-1 py-3 text-center"
                />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="123-456-7890"
                  pattern="\d{3}[\s-]?\d{3}[\s-]?\d{4}"
                  className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
                />
              </div>
            </fieldset>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              name="email"
              placeholder="c7TlG@example.com"
              className="w-full rounded-xl border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3"
            />
            <div className="mt-6 flex gap-3">
              <button className="bg-primary text-background w-full cursor-pointer rounded-xl px-3 py-4">
                Add Patient
              </button>
              <button
                className="outline-primary w-full cursor-pointer rounded-xl px-3 py-4 outline outline-2"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    portal,
  );
}
