import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import loginImg from "/static/images/login.svg";
import { resetPassword, verifyResetToken } from "../lib/api";
// import apiService from "../services/api";

export default function ResetPassword() {
  // const today = new Date().toLocaleDateString('en-US', { 
  //   year: 'numeric', 
  //   month: 'long', 
  //   day: 'numeric' 
  // });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(false);
  const [validating, setValidating] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ""
  });

  const token = searchParams.get('code');
  const uid = searchParams.get('uid');

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score++;
    else feedback.push("At least 8 characters");

    if (/[a-z]/.test(password)) score++;
    else feedback.push("One lowercase letter");

    if (/[A-Z]/.test(password)) score++;
    else feedback.push("One uppercase letter");

    if (/\d/.test(password)) score++;
    else feedback.push("One number");

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push("One special character");

    return {
      score,
      feedback: feedback.length > 0 ? `Missing: ${feedback.join(", ")}` : "Strong password"
    };
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  useEffect(() => {
    const validateToken = async () => {
      if (!token || !uid) {
        setError('Invalid reset link. Please request a new password reset.');
        setValidating(false);
        return;
      }

      try {
        const response = await verifyResetToken(token, uid);
        
        if (response.data.error) {
          setError(response.data.error);
          setTokenValid(false);
        } else {
          setTokenValid(true);
        }
      } catch (error) {
        setError('Failed to validate reset link. Please try again.');
        setTokenValid(false);
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token, uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Check password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(formData.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await resetPassword(token!, uid!, formData.password);
      
      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      // Navigate to success page
      navigate('/password/reset-success');
      
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#082368] mx-auto mb-4"></div>
            <p className="text-gray-600">Validating reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex flex-1 items-center justify-center px-4 py-4 min-h-0">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white rounded-lg overflow-hidden">
            <div className="w-full lg:w-2/3 flex justify-center items-center p-6 pr-16">
              <img src={loginImg} alt="Login visual" className="w-full h-auto max-h-[450px] object-cover rounded-lg" />
            </div>
            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-4xl font-nunito font-bold text-[#3A3A3A] mb-6">Reset Password</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
                <p className="text-gray-600 font-nunito text-base">
                  The password reset link is invalid or has expired. Please request a new one.
                </p>
                <div className="flex justify-center mt-6">
                  <Link
                    to="/password/forgot"
                    className="bg-[#082368] text-white rounded-lg py-3 px-6 font-nunito font-semibold hover:bg-[#061a4a] transition-colors"
                  >
                    Request New Reset Link
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">

      <div className="flex flex-1 items-center justify-center px-4 py-4 min-h-0">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white rounded-lg overflow-hidden">
          <div className="w-full lg:w-2/3 flex justify-center items-center p-6 pr-16">
            <img src={loginImg} alt="Login visual" className="w-full h-auto max-h-[450px] object-cover rounded-lg" />
          </div>

          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-4xl font-nunito font-bold text-[#3A3A3A] mb-6">Reset Password</h2>
            </div>
            <p className="text-gray-600 mb-6 font-nunito text-base">
              Enter your new password below.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-nunito font-semibold text-[#3A3A3A]">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                  className="p-4 rounded-lg border border-gray-300 font-nunito focus:outline-none focus:border-[#082368]"
                  placeholder="Enter your new password"
                  disabled={loading}
                />
                <div className="text-sm text-gray-500 mt-2">
                  Password Strength: {passwordStrength.score}/5
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.score <= 1 ? 'bg-red-500' :
                      passwordStrength.score <= 2 ? 'bg-orange-500' :
                      passwordStrength.score <= 3 ? 'bg-yellow-500' :
                      passwordStrength.score <= 4 ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
                <div className={`text-sm mt-1 ${
                  passwordStrength.score <= 1 ? 'text-red-500' :
                  passwordStrength.score <= 2 ? 'text-orange-500' :
                  passwordStrength.score <= 3 ? 'text-yellow-500' :
                  passwordStrength.score <= 4 ? 'text-blue-500' : 'text-green-500'
                }`}>
                  {passwordStrength.feedback}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="font-nunito font-semibold text-[#3A3A3A]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="p-4 rounded-lg border border-gray-300 font-nunito focus:outline-none focus:border-[#082368]"
                  placeholder="Confirm your new password"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#082368] text-white rounded-lg py-4 font-nunito font-semibold hover:bg-[#061a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 