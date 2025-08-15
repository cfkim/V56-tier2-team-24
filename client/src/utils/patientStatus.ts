// Patient status constants and utilities
export const STATUS_OPTIONS = [
  "Checked-In",
  "Pre-Procedure", 
  "In Progress",
  "Closing",
  "Recovery",
  "Complete",
  "Dismissal"
] as const;

export type PatientStatus = typeof STATUS_OPTIONS[number];

// Unified Patient interface that matches backend model
export interface Patient {
  _id: string;
  id: string; // patientID from backend
  currentStatus: PatientStatus; // medicalStatus from backend
  firstName: string;
  lastName: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  countryCode?: string;
  phoneNumber?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Utility functions
export const getStatusIndex = (status: PatientStatus): number => {
  return STATUS_OPTIONS.indexOf(status);
};

export const isStatusDisabled = (status: PatientStatus, currentStatus: PatientStatus): boolean => {
  const currentIndex = getStatusIndex(currentStatus);
  const statusIndex = getStatusIndex(status);
  
  // Previous statuses are disabled
  return statusIndex <= currentIndex;
};

export const getStatusButtonClass = (
  status: PatientStatus, 
  currentStatus: PatientStatus, 
  selectedStatus: PatientStatus | ""
): string => {
  const isDisabled = isStatusDisabled(status, currentStatus);
  const isSelected = selectedStatus === status;
  
  if (isSelected) {
    return 'bg-primary text-white border-primary';
  }
  
  if (isDisabled) {
    return 'bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed';
  }
  
  return 'bg-white text-header-black border-gray-300 hover:border-primary hover:bg-gray-50';
};

// Data transformation function to convert backend data to frontend format
export const transformPatientData = (backendPatient: any): Patient => {
  return {
    _id: backendPatient._id,
    id: backendPatient.patientID || backendPatient.id,
    currentStatus: backendPatient.medicalStatus || backendPatient.currentStatus,
    firstName: backendPatient.firstName || "",
    lastName: backendPatient.lastName || "",
    streetAddress: backendPatient.streetAddress,
    city: backendPatient.city,
    state: backendPatient.state,
    country: backendPatient.country,
    countryCode: backendPatient.countryCode,
    phoneNumber: backendPatient.phoneNumber,
    email: backendPatient.email,
    createdAt: backendPatient.createdAt,
    updatedAt: backendPatient.updatedAt,
  };
};
