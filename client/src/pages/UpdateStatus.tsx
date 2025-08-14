import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateStatus() {
  const [patientId, setPatientId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Add API call to validate patient ID
    // For now, simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to next page with patient ID
      navigate(`/update/patient/${patientId}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background font-nunito">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-kaisei mb-4 text-3xl font-bold text-header-black">
            Update Patient Status
          </h1>
          <p className="text-lg text-text">
            Keep surgery progress up to date. Log real-time updates and confirm.
          </p>
        </div>

        {/* Main Form */}
        <div className="mx-auto max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient ID Input */}
            <div>
              <label 
                htmlFor="patientId" 
                className="mb-2 block text-sm font-medium text-header-black"
              >
                Patient Number
              </label>
              <input
                type="text"
                id="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="#"
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!patientId.trim() || isSubmitting}
              className="h-12 w-full rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                <svg 
                  className="h-4 w-4 text-yellow-600" 
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
              <p className="text-sm text-gray-700">
                Only authorised staff can make updates. Double-check selections before submitting changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
