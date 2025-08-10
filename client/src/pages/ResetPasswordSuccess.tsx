import { Link } from "react-router-dom";
import loginImg from "/static/images/login.svg";

export default function ResetPasswordSuccess() {
  return (
    <div className="flex-1 flex flex-col bg-white">

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-4 py-4 min-h-0">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white rounded-lg overflow-hidden">
          {/* Left Image */}
          <div className="w-full lg:w-2/3 flex justify-center items-center p-6 pr-16">
            <img src={loginImg} alt="Login visual" className="w-full h-auto max-h-[450px] object-cover rounded-lg" />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-4xl font-nunito font-bold text-[#3A3A3A] mb-6">Log In</h2>
            </div>
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-nunito font-semibold text-[#3A3A3A] mb-2">
                  Password reset successfully!
                </h3>
                <p className="text-gray-600 font-nunito text-base">
                  Your password has been updated. You can now log in with your new password.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm font-nunito">
                  <strong>Security tip:</strong> Make sure to use a strong, unique password and never share it with anyone.
                </p>
              </div>

              <div className="flex justify-center">
                <Link
                  to="/login"
                  className="bg-[#082368] text-white rounded-lg py-3 px-8 font-nunito font-semibold hover:bg-[#061a4a] transition-colors"
                >
                  Continue to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 