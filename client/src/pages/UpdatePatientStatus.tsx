import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Patient {
  id: string;
  name: string;
  currentStatus: string;
  surgeryType?: string;
  roomNumber?: string;
}

export default function UpdatePatientStatus() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: "checked-in", label: "Checked In", color: "bg-checked-in" },
    { value: "pre-procedure", label: "Pre-Procedure", color: "bg-pre-procedure" },
    { value: "in-progress", label: "In Progress", color: "bg-in-progress" },
    { value: "closing", label: "Closing", color: "bg-closing" },
    { value: "recovery", label: "Recovery", color: "bg-recovery" },
    { value: "complete", label: "Complete", color: "bg-complete" },
    { value: "dismissal", label: "Dismissal", color: "bg-dismissal" },
  ];

  useEffect(() => {
    // Simulate API call to fetch patient data
    const fetchPatientData = async () => {
      setLoading(true);
      // TODO: Replace with actual API call
      setTimeout(() => {
        setPatient({
          id: patientId || "",
          name: "John Doe",
          currentStatus: "checked-in",
          surgeryType: "Appendectomy",
          roomNumber: "OR-101"
        });
        setLoading(false);
      }, 1000);
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return;

    setIsUpdating(true);
    // TODO: Add API call to update patient status
    setTimeout(() => {
      setIsUpdating(false);
      // Navigate back to patient status page or show success message
      navigate("/status");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-nunito flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-text">Loading patient information...</p>
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
            onClick={() => navigate("/update")}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Back to Update Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-nunito">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/update")}
            className="mb-4 flex items-center text-primary hover:text-primary/80"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Update Status
          </button>
          <h1 className="font-kaisei text-3xl font-bold text-header-black mb-2">
            Update Patient Status
          </h1>
          <p className="text-lg text-text">
            Update the status for Patient #{patient.id}
          </p>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-header-black mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
              <p className="text-lg font-semibold text-header-black">{patient.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <p className="text-lg font-semibold text-header-black">{patient.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusOptions.find(s => s.value === patient.currentStatus)?.color} text-black`}>
                {statusOptions.find(s => s.value === patient.currentStatus)?.label}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surgery Type</label>
              <p className="text-lg text-header-black">{patient.surgeryType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
              <p className="text-lg text-header-black">{patient.roomNumber}</p>
            </div>
          </div>
        </div>

        {/* Status Update Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-header-black mb-6">Update Status</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select New Status
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => setSelectedStatus(status.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedStatus === status.value
                      ? `border-primary ${status.color}`
                      : "border-gray-200 hover:border-gray-300 bg-gray-50"
                  }`}
                >
                  <div className="font-medium text-header-black">{status.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/update")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleStatusUpdate}
              disabled={!selectedStatus || isUpdating}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
