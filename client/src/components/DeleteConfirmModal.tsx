import { useEffect } from "react";
import { createPortal } from "react-dom";
import API from "../config/apiClient";
import { getAuthHeader } from "../stores/authStore";
export default function DeleteConfirmModal({
  isOpen,
  onClose,
  fetchPatients,
  selectedPatientID,
  setLastDeletedPatientId,
}: {
  isOpen: boolean;
  onClose: () => void;
  fetchPatients: () => void;
  selectedPatientID: string;
  setLastDeletedPatientId: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    if (isOpen) {
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

  const deletePatient = async (patientID: string) => {
    console.log("deleting user attempt: " + patientID);
    const token = getAuthHeader();

    try {
      await API.delete("/patient/delete", {
        headers: {
          Authorization: token,
        },
        data: { id: patientID },
      });

      setLastDeletedPatientId(patientID);
      fetchPatients();
      onClose();
    } catch {
      console.log("error deleting patient");
    }
  };

  return createPortal(
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-30 bg-black/40"
        onClick={onClose}
      />
      <div
        aria-modal="true"
        className="bg-background font-nunito no-scrollbar fixed top-50 right-0 left-0 z-50 mx-auto flex max-h-[calc(100vh-5rem)] w-10/12 max-w-3xl flex-col gap-4 overflow-y-auto rounded-xl px-7 py-6 pb-10 text-[#303030] shadow-xl sm:px-8 sm:py-7 sm:pb-12 sm:pl-12 md:px-9 md:py-8 md:pb-12 md:pl-14 lg:px-10 lg:py-9 lg:pb-12 lg:pl-16 xl:px-11 xl:py-10 xl:pb-12 xl:pl-20"
      >
        <button
          className="text-primary flex w-full cursor-pointer items-center justify-end"
          onClick={onClose}
        >
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
            xmlns="http://www.w3.org/2000/svg"
            height="34px"
            viewBox="0 -960 960 960"
            width="34px"
            fill="currentColor"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_328_5592)">
              <path
                d="M12.0001 14.6667C14.9456 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9456 4 12.0001 4C9.05456 4 6.66675 6.38781 6.66675 9.33333C6.66675 12.2789 9.05456 14.6667 12.0001 14.6667Z"
                stroke="#CDA90C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 28V25.3333C4 23.9188 4.5619 22.5623 5.5621 21.5621C6.56229 20.5619 7.91885 20 9.33333 20H14.6667C16.0812 20 17.4377 20.5619 18.4379 21.5621C19.4381 22.5623 20 23.9188 20 25.3333V28"
                stroke="#CDA90C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.3333 9.3335V13.3335"
                stroke="#CDA90C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.3333 18.6665V18.6798"
                stroke="#CDA90C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_328_5592">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="flex flex-col gap-5 sm:gap-6">
            <h3 className="font-bold">
              Are you sure you want to delete this patient profile?
            </h3>

            <p>
              You are about to permanently delete this patient's profile from
              the system. This action cannot be undone and will remove all
              associated data.
            </p>
            <div className="mb-2 flex gap-3.5 text-sm sm:gap-6">
              <div
                onClick={onClose}
                className="text-primary outline-primary flex w-full max-w-32 cursor-pointer items-center justify-center rounded-xl py-2.5 font-semibold outline outline-2 sm:py-3 md:py-3.5 lg:py-4"
              >
                Cancel
              </div>
              <button
                className="bg-primary text-background w-full max-w-3xs cursor-pointer rounded-xl py-2.5 font-semibold sm:py-3 md:py-3.5 lg:py-4"
                onClick={() => deletePatient(selectedPatientID)}
              >
                Delete Permanently
              </button>
            </div>
            <p className="italic">
              *This action is restricted to authorized administrators only.
              Proceed with caution.
            </p>
          </div>
        </div>
      </div>
    </>,
    portal,
  );
}
