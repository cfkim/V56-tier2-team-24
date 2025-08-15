import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Patient {
  id: string;
  currentStatus: string;
}

const STATUS_OPTIONS = [
  "Checked-In",
  "Pre-Procedure", 
  "In Progress",
  "Closing",
  "Recovery",
  "Complete",
  "Dismissal"
];

export default function UpdatePatientStatus() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate fetching patient data
    setTimeout(() => {
      setPatient({
        id: patientId || "",
        currentStatus: "In Progress"
      });
      setLoading(false);
    }, 1000);
  }, [patientId]);

  const getStatusIndex = (status: string) => {
    return STATUS_OPTIONS.indexOf(status);
  };

  const isStatusDisabled = (status: string) => {
    if (!patient) return true;
    
    const currentIndex = getStatusIndex(patient.currentStatus);
    const statusIndex = getStatusIndex(status);
    
    // Previous statuses are disabled
    return statusIndex <= currentIndex;
  };

  const handleStatusSelect = (status: string) => {
    if (isStatusDisabled(status)) return;
    setSelectedStatus(status);
  };

  const handleSaveChanges = async () => {
    if (!selectedStatus) return;
    
    setIsSaving(true);
    
    // TODO: Add API call to update patient status
    setTimeout(() => {
      setIsSaving(false);
      // Navigate to confirmation page
      navigate("/update/confirmation");
    }, 1000);
  };

  const handleBack = () => {
    navigate("/update");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-nunito flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text">Loading patient information...</p>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-background font-nunito flex items-center justify-center">
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
    <div className="min-h-screen bg-background font-nunito">
      <div className="flex-1 flex flex-col bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center text-text hover:text-primary mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Page Title and Description */}
          <div className="text-center mb-8">
            <h1 className="font-kaisei text-4xl font-bold text-header-black mb-4">
              Update Patient Status
            </h1>
            <p className="text-lg text-text">
              Log and update their real-time status in surgery
            </p>
          </div>

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
                className="w-full h-12 px-4 py-3 text-lg border border-gray-300 rounded-lg bg-gray-50 text-header-black cursor-not-allowed"
              />
            </div>

            {/* New Status Field */}
            <div>
              <label className="block text-sm font-medium text-header-black mb-4">
                New Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {STATUS_OPTIONS.map((status) => {
                  const isDisabled = isStatusDisabled(status);
                  const isSelected = selectedStatus === status;
                  
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusSelect(status)}
                      disabled={isDisabled}
                      className={`
                        h-12 px-4 py-2 rounded-lg border-2 font-medium transition-all
                        ${isSelected 
                          ? 'bg-primary text-white border-primary' 
                          : isDisabled 
                            ? 'bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed' 
                            : 'bg-white text-header-black border-gray-300 hover:border-primary hover:bg-gray-50'
                        }
                      `}
                    >
                      {status}
                    </button>
                  );
                })}
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
