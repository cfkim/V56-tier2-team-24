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

export interface Patient {
  id: string;
  currentStatus: PatientStatus;
  firstName?: string;
  lastName?: string;
}

// Simple in-memory storage for testing
const patientStatusStore = new Map<string, PatientStatus>();

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

// Mock data and storage functions for testing
export const createMockPatient = (patientId: string): Patient => {
  // Check if we have a saved status for this patient
  const savedStatus = patientStatusStore.get(patientId);
  
  return {
    id: patientId,
    currentStatus: savedStatus || "In Progress", // Use saved status or default
    firstName: "John",
    lastName: "Doe"
  };
};

// Save patient status to memory store
export const savePatientStatus = (patientId: string, newStatus: PatientStatus): void => {
  patientStatusStore.set(patientId, newStatus);
  console.log(`Patient ${patientId} status saved to: ${newStatus}`);
};

// Get current saved status for a patient
export const getPatientStatus = (patientId: string): PatientStatus | undefined => {
  return patientStatusStore.get(patientId);
};

// Debug function to view all saved patient statuses
export const debugPatientStatuses = (): void => {
  console.log("=== Saved Patient Statuses ===");
  if (patientStatusStore.size === 0) {
    console.log("No patient statuses saved yet.");
  } else {
    patientStatusStore.forEach((status, patientId) => {
      console.log(`Patient ${patientId}: ${status}`);
    });
  }
  console.log("==============================");
};
