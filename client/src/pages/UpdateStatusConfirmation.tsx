import { useNavigate } from "react-router-dom";

export default function UpdateStatusConfirmation() {
  const navigate = useNavigate();

  const handleUpdateAnother = () => {
    navigate("/update");
  };

  return (
    <div className="min-h-screen bg-background font-nunito">
      <div className="flex-1 flex flex-col bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="font-kaisei text-4xl font-bold text-header-black mb-4">
              Update Patient Status
            </h1>
          </div>

          {/* Confirmation Content */}
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Message */}
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-4 h-4 text-green-600" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium text-green-800">
                  Patient changes saved successfully
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-8"></div>

            {/* Update Another Patient Link */}
            <div className="text-center">
              <p className="text-lg text-text mb-4">
                Update Status of another patient
              </p>
              <button
                onClick={handleUpdateAnother}
                className="text-primary hover:text-primary/80 underline font-medium text-lg transition-colors"
              >
                here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
