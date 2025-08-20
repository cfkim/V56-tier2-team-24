import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await forgotPassword(email);

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      // Check if we got a successful response
      if (response.data) {
        const data = response.data as any;

        // In development mode, shows the reset URL if provided
        if (data.resetUrl) {
          setError(`Development Mode: Reset URL - ${data.resetUrl}`);
          return;
        }

        // If no resetUrl but successful, navigates to confirmation page
        navigate("/password/reset-link-sent");
      } else {
        setError("Unexpected response format");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Main content */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-4">
        <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-lg bg-white lg:flex-row">
          {/* Left Image */}
          <div className="hidden w-full items-center justify-center p-6 pr-16 md:flex lg:w-2/3">
            <img
              src="/static/images/login.svg"
              alt="Login image"
              className="h-auto max-h-[450px] w-full rounded-lg object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="flex w-full flex-col justify-center p-8 lg:w-1/2">
            <div className="mb-8">
              <h2 className="font-kaisei mb-6 text-4xl font-bold text-[#3A3A3A]">
                Log In
              </h2>
              <h3 className="font-nunito text-2xl font-semibold text-[#3A3A3A]">
                Forgot password?
              </h3>
            </div>
            <p className="font-nunito mb-6 text-base text-gray-600">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-nunito font-semibold text-[#3A3A3A]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-nunito rounded-lg border border-gray-300 p-4 focus:border-[#082368] focus:outline-none"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="font-nunito rounded-lg bg-[#082368] py-4 font-semibold text-white transition-colors hover:bg-[#061a4a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Link"}
              </button>
              <div className="mt-4 flex justify-center">
                <Link
                  to="/login"
                  className="font-nunito text-[#082368] underline hover:no-underline"
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
