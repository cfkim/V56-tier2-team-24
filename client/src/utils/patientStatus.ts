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
