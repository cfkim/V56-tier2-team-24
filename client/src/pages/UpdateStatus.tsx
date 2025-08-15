import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatientById } from "../lib/api";

export default function UpdateStatus() {
  const [patientId, setPatientId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId.trim()) {
      setError("Please enter a patient number");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      
      // Validate that the patient exists
      await getPatientById(patientId.trim());
      
      // Navigate to the patient status update page
      navigate(`/update/patient/${patientId.trim()}`);
    } catch (err: any) {
      console.error("Error validating patient:", err);
      setError(err.response?.data?.message || "Patient not found. Please check the patient number.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-background font-nunito flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-2xl mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="font-kaisei text-4xl font-bold text-header-black mb-4">
              Update Patient Status
            </h1>
            <p className="text-lg text-text">
              Update the status of the patient by just typing in their patient number.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-md mx-auto space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient ID Input */}
              <div>
                <label 
                  htmlFor="patientId" 
                  className="block text-sm font-medium text-header-black mb-2"
                >
                  Patient Number
                </label>
                <input
                  type="text"
                  id="patientId"
                  value={patientId}
                  onChange={(e) => {
                    setPatientId(e.target.value);
                    if (error) setError(""); // Clear error when user types
                  }}
                  placeholder="#"
                  className="w-full h-12 px-4 py-3 text-lg border border-gray-300 rounded-lg bg-gray-50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!patientId.trim() || isSubmitting}
                className="w-full h-12 bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white font-semibold text-lg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Validating..." : "Submit"}
              </button>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-4 h-4 text-yellow-600" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Only authorised staff can make updates. Double-check selections before submitting changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
