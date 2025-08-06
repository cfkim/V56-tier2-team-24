// src/pages/ForgotPassword.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "/static/images/login.svg";
import apiService from "../services/api";

export default function ForgotPassword() {
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const response = await apiService.forgotPassword(email);
      
      if (response.error) {
        setError(response.error);
        return;
      }

      // Check if we got a successful response
      if (response.data) {
        const data = response.data as any;
        
        // In development mode, show the reset URL if provided
        if (data.resetUrl) {
          setError(`Development Mode: Reset URL - ${data.resetUrl}`);
          return;
        }
        
        // If no resetUrl but successful, navigate to confirmation page
        navigate("/password/reset-link-sent");
      } else {
        setError('Unexpected response format');
      }
      
    } catch (error) {
      console.error('API Error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-8 pt-6">
        <h1 className="text-xl font-nunito font-bold text-[#3A3A3A]">Lumo</h1>
        <p className="text-sm font-nunito text-gray-500">{today}</p>
      </div>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-4 py-4 min-h-0">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white rounded-lg overflow-hidden">
          {/* Left Image */}
          <div className="w-full lg:w-2/3 flex justify-center items-center p-6 pr-16">
            <img src={loginImg} alt="Login visual" className="w-full h-auto max-h-[450px] object-cover rounded-lg" />
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-4xl font-nunito font-bold text-[#3A3A3A] mb-6">Log In</h2>
              <h3 className="text-2xl font-nunito font-semibold text-[#3A3A3A] ">Forgot password?</h3>
            </div>
            <p className="text-gray-600 mb-6 font-nunito text-base">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-nunito font-semibold text-[#3A3A3A]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-4 rounded-lg border border-gray-300 font-nunito focus:outline-none focus:border-[#082368]"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#082368] text-white rounded-lg py-4 font-nunito font-semibold hover:bg-[#061a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Link"}
              </button>
              <div className="flex justify-center mt-4">
                <Link
                  to="/login"
                  className="text-[#082368] font-nunito underline hover:no-underline"
                >
                  Back to Login page
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}