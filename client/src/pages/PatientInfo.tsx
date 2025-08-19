import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { getPatients } from "../lib/api";
// import { SmallSearch } from "../components/search";
import PatientFormModal from "../components/PatientForm/PatientFormModal";
import SuccessMessage from "../components/PatientForm/SuccessMessage";
import Search from "../components/search";

import DeleteConfirmModal from "../components/DeleteConfirmModal";
import FilterSheet from "../components/Filter";
import type { Patient } from "../types/Patient";
import capitalize from "../utils/capitalize";
import cn from "../utils/cn";

export default function PatientInfo() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [options, setOptions] = useState([""]);
  const [category, setCategory] = useState("All");
  const searchTermRef = useRef("");
  const [patientFormIsOpen, setPatientFormIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [openPatientID, setOpenPatientID] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false);
  const [lastAddedPatientId, setLastAddedPatientId] = useState<string>("");
  const [lastEditedPatientId, setLastEditedPatientId] = useState<string>("");
  const [lastDeletedPatientId, setLastDeletedPatientId] = useState<string>("");
  const [successIsOpen, setSuccessIsOpen] = useState(false);
  const [filterSheetIsOpen, setFilterSheetIsOpen] = useState(false);
  const [successAction, setSuccessAction] = useState<
    "add" | "edit" | "delete" | ""
  >("");

  // pagination
  const [page, setPage] = useState(1);
  const resultsPerPage = 10; // Number of results on each page

  const getNumPages = () => {
    return Math.ceil(patients.length / resultsPerPage);
  };

  // gets the page navigation numbers to show at the bottom
  function getPageNav(current: number, total: number) {
    const pages = [];
    // if total pages less than or equal to 7, shows all pages
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    // 0 means ... in the page nav

    // if current page is in the first 4, then shows first 4 pages
    if (current < 3) {
      pages.push(1, 2, 3, 4, 0, total);
    } else if (current > total - 2) {
      // if current page in last 4
      pages.push(1, 0, total - 3, total - 2, total - 1, total);
    } else {
      // if current page is in the middlee
      pages.push(1, 0, current - 1, current, current + 1, 0, total);
    }

    return pages;
  }

  // Gets a filtered list based on search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    searchTermRef.current = value;

    fetchPatients(value);
  };

  const fetchPatients = async (term: String) => {
    try {
      const result = await getPatients();
      const patients = result.data.patients;
      let categorized = patients;

      console.log(selectedStatus);
      if (category == "Before") {
        categorized = patients.filter(
          (patient: Patient) =>
            patient.medicalStatus == "checked-in" ||
            patient.medicalStatus == "pre-procedure",
        );
      } else if (category == "During") {
        categorized = patients.filter(
          (patient: Patient) =>
            patient.medicalStatus == "in-progress" ||
            patient.medicalStatus == "closing",
        );
      } else if (category == "After") {
        categorized = patients.filter(
          (patient: Patient) =>
            patient.medicalStatus == "recovery" ||
            patient.medicalStatus == "complete" ||
            patient.medicalStatus == "dismissal",
        );
      }

      // further filters if an option is selected
      if (selectedStatus !== "All" && selectedStatus !== "") {
        categorized = categorized.filter(
          (patient: Patient) => patient.medicalStatus === selectedStatus,
        );
      }

      console.log(categorized);
      // if there's a search term, then return the filtered list
      if (term !== "") {
        const filteredList = categorized.filter((patient: Patient) =>
          patient.patientID
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase()),
        );
        setPatients(filteredList);
      } else {
        setPatients(categorized);
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    fetchPatients(searchTermRef.current);
  }, [selectedStatus, category]);

  const TIME_OUT = 1000;

  useEffect(() => {
    if (!lastAddedPatientId) return;
    console.log("lastAddedPatientId: " + lastAddedPatientId);
    setSuccessIsOpen(true);
    setSuccessAction("add");
    const t = setTimeout(() => {
      setSuccessIsOpen(false);
      setSuccessAction("");
      setLastAddedPatientId("");
    }, TIME_OUT);
    return () => clearTimeout(t);
  }, [lastAddedPatientId]);

  useEffect(() => {
    if (!lastEditedPatientId) return;
    console.log("lastEditedPatientId: " + lastEditedPatientId);
    setSuccessIsOpen(true);
    setSuccessAction("edit");
    const t = setTimeout(() => {
      setSuccessIsOpen(false);
      setSuccessAction("");
      setLastEditedPatientId("");
    }, TIME_OUT);
    return () => clearTimeout(t);
  });
  useEffect(() => {
    if (!lastDeletedPatientId) return;
    console.log("lastDeletedPatientId: " + lastDeletedPatientId);
    setSuccessIsOpen(true);
    setSuccessAction("delete");
    const t = setTimeout(() => {
      setSuccessIsOpen(false);
      setSuccessAction("");
      setLastDeletedPatientId("");
    }, TIME_OUT);
    return () => clearTimeout(t);
  });

  return (
    <>
      <div className="font-nunito m-5 md:m-20">
        <div className="flex flex-col">
          <div className="mb-10 flex flex-col justify-between md:flex-row">
            <div className="md:mx-4">
              <h1 className="font-kaisei mb-5 text-xl font-bold md:text-3xl">
                Patient Information Dashboard
              </h1>
              <p>
                View and manage essential patient details before, during, and
                after surgery. <br></br> Please ensure all updates are accurate
                and respectful of patient privacy.
              </p>
            </div>

            <div className="md:hidden">
              <Search handleChange={handleInputChange}></Search>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setPatientFormIsOpen(true);
                  setOpenPatientID(null);
                  setSelectedPatient(null);
                }}
                className="bg-primary mt-3 flex h-12 cursor-pointer items-center gap-2 rounded-xl px-4 text-sm text-white md:h-12 md:rounded-2xl md:text-lg"
              >
                Add a New Patient
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="#FFFFFF"
                  className="size-6 md:size-4"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-4 hidden flex-row justify-between md:flex">
            <div className="flex flex-row gap-8 text-gray-400">
              <button
                className={clsx(
                  "h-12 rounded-2xl px-10",
                  category === "All"
                    ? "outline-primary text-primary outline-2"
                    : "",
                )}
                onClick={() => {
                  if (category !== "All") {
                    setSelectedStatus("");
                  }
                  setCategory("All");
                  setSelectedStatus("All");
                }}
              >
                All
              </button>
              <button
                className={clsx(
                  "h-12 rounded-2xl px-4",
                  category === "Before"
                    ? "outline-primary text-primary outline-2"
                    : "",
                )}
                onClick={() => {
                  if (category !== "Before") {
                    setSelectedStatus("");
                  }
                  setCategory("Before");
                  setOptions(["checked-in", "pre-procedure"]);
                }}
              >
                Before Procedure
              </button>
              <button
                className={clsx(
                  "h-12 rounded-2xl px-4",
                  category === "During"
                    ? "outline-primary text-primary outline-2"
                    : "",
                )}
                onClick={() => {
                  if (category !== "During") {
                    setSelectedStatus("");
                  }
                  setCategory("During");
                  setOptions(["in-progress", "closing"]);
                }}
              >
                During Procedure
              </button>
              <button
                className={clsx(
                  "h-12 rounded-2xl px-4",
                  category === "After"
                    ? "outline-primary text-primary outline-2"
                    : "",
                )}
                onClick={() => {
                  if (category !== "After") {
                    setSelectedStatus("");
                  }
                  setCategory("After");
                  setOptions(["recovery", "complete", "dismissal"]);
                }}
              >
                After Procedure
              </button>
            </div>
            <Search handleChange={handleInputChange}></Search>
          </div>
          {category !== "All" && (
            <div className="text-gray-400">
              {options.map((option) => {
                return (
                  <button
                    key={option}
                    onClick={() => setSelectedStatus(option)}
                    className={clsx(
                      "font-nunito-bold mb-5 px-6 text-lg",
                      option === selectedStatus
                        ? "text-primary border-primary border-b-2"
                        : "",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative overflow-visible">
          <table className="min-w-full overflow-hidden rounded-2xl text-lg outline-2 outline-gray-100">
            <thead className="bg-accent font-nunito-bold h-12 text-left">
              <tr>
                <th className="pl-5" scope="col">
                  Patient
                </th>
                <th scope="col" className="hidden md:table-cell">
                  Street Address
                </th>
                <th scope="col" className="hidden md:table-cell">
                  Country
                </th>
                <th scope="col" className="hidden md:table-cell">
                  Phone Number
                </th>
                <th scope="col" className="hidden md:table-cell">
                  Email Address
                </th>
                <th scope="col" className="md:hidden"></th>
                <th scope="col" className="hidden md:table-cell">
                  Medical Status
                </th>
                <th scope="col" className="hidden md:table-cell"></th>
                <th scope="col" className="md:hidden">
                  <button
                    className="flex items-center justify-center"
                    onClick={() => setFilterSheetIsOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
                    </svg>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-lg">
              {patients
                .slice(resultsPerPage * (page - 1), resultsPerPage * page)
                .map((patient: Patient) => (
                  <tr
                    className={cn(
                      "border-b-1 border-gray-200 last:border-b-0",
                      successIsOpen && lastAddedPatientId !== patient.patientID
                        ? "opacity-20"
                        : "",
                    )}
                    key={patient._id}
                  >
                    <td className="px-5 py-3 pr-10 md:pr-50">
                      <div className="flex flex-col">
                        <div className="font-nunito-bold">
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="text-md text-gray-500">
                          Patient No: {patient.patientID}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-3 md:table-cell">
                      {patient.streetAddress}
                    </td>
                    <td className="hidden py-3 pr-15 md:table-cell">
                      {patient.country}
                    </td>
                    <td className="hidden py-3 md:table-cell">
                      {patient.phoneNumber}
                    </td>
                    <td className="hidden py-3 md:table-cell">
                      {patient.email}
                    </td>

                    <td className="py-3 text-xs md:text-lg">
                      <div
                        className={clsx(
                          "inline-block rounded-full px-2 py-1 text-center text-white md:px-6 md:py-2",
                          patient.medicalStatus == "checked-in"
                            ? "bg-checked-in"
                            : patient.medicalStatus == "pre-procedure"
                              ? "bg-pre-procedure"
                              : patient.medicalStatus == "in-progress"
                                ? "bg-in-progress"
                                : patient.medicalStatus == "closing"
                                  ? "bg-closing"
                                  : patient.medicalStatus == "recovery"
                                    ? "bg-recovery"
                                    : patient.medicalStatus == "complete"
                                      ? "bg-complete"
                                      : patient.medicalStatus == "dismissal"
                                        ? "bg-dismissal"
                                        : "",
                        )}
                      >
                        {capitalize(patient.medicalStatus)}
                      </div>
                    </td>
                    <td className="py-3">
                      <button
                        className="cursor-pointer pr-5 md:pr-2"
                        onClick={() => {
                          const next =
                            openPatientID === patient.patientID
                              ? null
                              : patient.patientID;
                          setOpenPatientID(next);
                          if (next) setSelectedPatient(patient);
                        }}
                      >
                        ...
                      </button>
                      {openPatientID && openPatientID === patient.patientID && (
                        <div className="top-1/2+1 absolute right-3 z-10 flex flex-col rounded-xl bg-[#F8F8F8] text-xs md:text-sm">
                          <div
                            className="flex cursor-pointer items-center gap-2.5 rounded-t-xl border-b-1 border-[#DDE1E6] px-5 py-3.5 underline hover:bg-gray-100 md:px-7 md:py-5"
                            onClick={() => {
                              setOpenPatientID(null);
                              setSelectedPatient(patient);
                              setPatientFormIsOpen(true);
                            }}
                          >
                            <svg
                              className="h-3 w-3 md:h-4 md:w-4"
                              width="33"
                              height="33"
                              viewBox="0 0 33 33"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M28.7335 4.26635C27.4448 2.97762 25.3553 2.97762 24.0666 4.26635L11.55 16.7829V21.4498H16.2169L28.7335 8.93326C30.0222 7.64453 30.0222 5.55508 28.7335 4.26635Z"
                                fill="#082368"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.30005 9.89981C3.30005 8.07727 4.77751 6.5998 6.60005 6.5998H13.2C14.1113 6.5998 14.85 7.33854 14.85 8.2498C14.85 9.16107 14.1113 9.89981 13.2 9.89981H6.60005V26.3998H23.1V19.7998C23.1 18.8885 23.8388 18.1498 24.75 18.1498C25.6613 18.1498 26.4001 18.8885 26.4001 19.7998V26.3998C26.4001 28.2223 24.9226 29.6998 23.1 29.6998H6.60005C4.77751 29.6998 3.30005 28.2223 3.30005 26.3998V9.89981Z"
                                fill="#082368"
                              />
                            </svg>
                            Edit Information
                          </div>
                          <div
                            className="flex cursor-pointer items-center gap-2.5 rounded-b-xl px-5 py-3.5 underline hover:bg-gray-100 md:px-7 md:py-5"
                            onClick={() => {
                              setOpenPatientID(null);
                              setSelectedPatient(patient);
                              setDeleteConfirmIsOpen(true);
                            }}
                          >
                            <svg
                              className="h-3 w-3 md:h-4 md:w-4"
                              width="24"
                              height="30"
                              viewBox="0 0 24 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.167 9L21.1575 27.165C21.1153 27.9309 20.7813 28.6516 20.2242 29.1789C19.667 29.7062 18.9291 30 18.162 30H5.838C5.07091 30 4.33295 29.7062 3.77582 29.1789C3.21868 28.6516 2.88469 27.9309 2.8425 27.165L1.833 9H22.167ZM1.5 0H22.5C22.8978 0 23.2794 0.158035 23.5607 0.43934C23.842 0.720644 24 1.10218 24 1.5V4.5C24 4.89782 23.842 5.27936 23.5607 5.56066C23.2794 5.84196 22.8978 6 22.5 6H1.5C1.10218 6 0.720644 5.84196 0.43934 5.56066C0.158035 5.27936 0 4.89782 0 4.5V1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0V0ZM9 12C8.60218 12 8.22064 12.158 7.93934 12.4393C7.65804 12.7206 7.5 13.1022 7.5 13.5V24C7.5 24.3978 7.65804 24.7794 7.93934 25.0607C8.22064 25.342 8.60218 25.5 9 25.5C9.39782 25.5 9.77936 25.342 10.0607 25.0607C10.342 24.7794 10.5 24.3978 10.5 24V13.5C10.5 13.1022 10.342 12.7206 10.0607 12.4393C9.77936 12.158 9.39782 12 9 12ZM15 12C14.6022 12 14.2206 12.158 13.9393 12.4393C13.658 12.7206 13.5 13.1022 13.5 13.5V24C13.5 24.3978 13.658 24.7794 13.9393 25.0607C14.2206 25.342 14.6022 25.5 15 25.5C15.3978 25.5 15.7794 25.342 16.0607 25.0607C16.342 24.7794 16.5 24.3978 16.5 24V13.5C16.5 13.1022 16.342 12.7206 16.0607 12.4393C15.7794 12.158 15.3978 12 15 12Z"
                                fill="#082368"
                              />
                            </svg>
                            Delete Profile
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="font-nunito-bold bottom-0 mt-5 flex text-sm md:mt-10 md:text-xl">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="mx-5 flex items-center gap-2 hover:cursor-pointer disabled:cursor-default disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
            Prev
          </button>
          {getPageNav(page, getNumPages()).map((num, index) => (
            <button
              key={index}
              onClick={() => setPage(num)}
              disabled={num == 0}
              className={clsx(
                "mx-1 rounded-lg px-4 py-2 hover:cursor-pointer disabled:pointer-events-none",
                page === num ? "bg-accent pointer-events-none" : "",
              )}
            >
              {num == 0 ? "..." : num}
            </button>
          ))}
          <button
            disabled={page >= getNumPages()}
            onClick={() => setPage(page + 1)}
            className="mx-5 flex items-center gap-2 hover:cursor-pointer disabled:cursor-default disabled:opacity-50"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </button>
        </div>
      </div>
      <FilterSheet
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        isOpen={filterSheetIsOpen}
        setIsOpen={setFilterSheetIsOpen}
      ></FilterSheet>
      <PatientFormModal
        isEdit={selectedPatient !== null}
        isOpen={patientFormIsOpen}
        onClose={() => {
          setPatientFormIsOpen(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
        fetchPatients={() => fetchPatients(searchTermRef.current)}
        setLastAddedPatientId={setLastAddedPatientId}
        setLastEditedPatientId={setLastEditedPatientId}
      />
      <DeleteConfirmModal
        isOpen={deleteConfirmIsOpen}
        onClose={() => {
          setDeleteConfirmIsOpen(false);
          setSelectedPatient(null);
        }}
        fetchPatients={() => fetchPatients(searchTermRef.current)}
        selectedPatientID={selectedPatient?.patientID || ""}
        setLastDeletedPatientId={setLastDeletedPatientId}
      />
      <SuccessMessage isOpen={successIsOpen} action={successAction} />
    </>
  );
}
