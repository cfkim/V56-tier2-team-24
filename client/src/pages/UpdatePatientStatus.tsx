import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPatientById, updatePatientStatus } from "../lib/api";
import { 
  STATUS_OPTIONS, 
  type Patient, 
  type PatientStatus,
  isStatusDisabled, 
  getStatusButtonClass
} from "../utils/patientStatus";

export default function UpdatePatientStatus() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<PatientStatus | "">("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) {
        setError("Patient ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await getPatientById(patientId);
        setPatient(response.data.patient);
      } catch (err: any) {
        console.error("Error fetching patient:", err);
        setError(err.response?.data?.message || "Failed to fetch patient information");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  const handleStatusSelect = (status: PatientStatus) => {
    if (!patient || isStatusDisabled(status, patient.currentStatus)) return;
    setSelectedStatus(status);
  };

  const handleSaveChanges = async () => {
    if (!selectedStatus || !patientId) return;
    
    try {
      setIsSaving(true);
      setError("");
      
      await updatePatientStatus(patientId, selectedStatus);
      
      // Navigate to confirmation page
      navigate("/update/confirmation");
    } catch (err: any) {
      console.error("Error updating patient status:", err);
      setError(err.response?.data?.message || "Failed to update patient status");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    navigate("/update");
  };

  if (loading) {
    return (
      <div className="flex-1 bg-background font-nunito flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text">Loading patient information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-background font-nunito flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-header-black mb-4">Error</h2>
          <p className="text-text mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex-1 bg-background font-nunito flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-header-black mb-4">Patient Not Found</h2>
          <p className="text-text mb-6">The patient with ID {patientId} could not be found.</p>
          <button
            onClick={handleBack}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background font-nunito flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8 w-full">
          {/* Back Button and Title in same row */}
          <div className="flex items-start justify-between mb-8">
            <button
              onClick={handleBack}
              className="flex items-center text-text hover:text-primary transition-colors px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            
            <div className="text-center flex-1 px-4">
              <h1 className="font-kaisei text-4xl font-bold text-header-black mb-2">
                Update Patient Status
              </h1>
              <p className="text-lg text-text">
                Log and update their real-time status in surgery
              </p>
            </div>
            
            <div className="w-24"></div> {/* Spacer to balance the layout */}
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Patient Number Field */}
            <div>
              <label className="block text-sm font-medium text-header-black mb-2">
                Patient Number
              </label>
              <input
                type="text"
                value={patient.id}
                readOnly
                className="w-full h-12 px-4 py-3 text-lg border border-gray-300 rounded-lg bg-yellow-50 text-header-black cursor-not-allowed"
              />
            </div>

            {/* Current Status Field */}
            <div>
              <label className="block text-sm font-medium text-header-black mb-2">
                Current Status
              </label>
              <input
                type="text"
                value={patient.currentStatus}
                readOnly
                className="w-full h-12 px-4 py-3 text-lg border border-gray-300 rounded-lg bg-yellow-50 text-header-black cursor-not-allowed"
              />
            </div>

            {/* New Status Field */}
            <div>
              <label className="block text-sm font-medium text-header-black mb-4">
                New Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    disabled={isStatusDisabled(status, patient.currentStatus)}
                    className={`
                      h-12 px-4 py-2 rounded-lg border-2 font-medium transition-all
                      ${getStatusButtonClass(status, patient.currentStatus, selectedStatus)}
                    `}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="pt-6">
              <button
                onClick={handleSaveChanges}
                disabled={!selectedStatus || isSaving}
                className={`
                  w-full h-12 rounded-lg font-semibold text-lg transition-colors
                  ${selectedStatus && !isSaving
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
