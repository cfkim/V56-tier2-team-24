// src/pages/ForgotPassword.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import loginImg from "/static/images/login.svg"; 

export default function ForgotPassword() {
  const today = format(new Date(), "MMMM d, yyyy");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send request to backend
    navigate("/password/reset-link-sent");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#ECECEC]">
      {/* Header */}
      <div className="flex justify-between items-center px-8 pt-6">
        <h1 className="text-xl font-bold text-[#3A3A3A]">Lumo</h1>
        <p className="text-sm text-gray-500">{today}</p>
      </div>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-md overflow-hidden">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 bg-gray-200 flex justify-center items-center">
            <img src={loginImg} alt="Login visual" className="max-w-full " />
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Forgot your password?</h2>
            <p className="text-gray-600 mb-6">
              No worries! Enter your email and we’ll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="email" className="font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-lg border border-gray-300"
                placeholder="example@email.com"
              />
              <button
                type="submit"
                className="bg-[#082368] text-white rounded-lg py-3 mt-2 hover:bg-black"
              >
                Reset Password
              </button>
              <div className="flex justify-center mt-4">
                <Link
                  to="/login"
                  className="text-[#555555] inline-block hover:underline"
                >
                  ← Back to Login Page
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}