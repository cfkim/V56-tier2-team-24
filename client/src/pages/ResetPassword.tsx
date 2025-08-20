import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword, verifyResetToken } from "../lib/api";

export default function ResetPassword() {
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
    feedback: "",
  });

  const token = searchParams.get("code");
  const uid = searchParams.get("uid");

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
      feedback:
        feedback.length > 0
          ? `Missing: ${feedback.join(", ")}`
          : "Strong password",
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
        setError("Invalid reset link. Please request a new password reset.");
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
        setError("Failed to validate reset link. Please try again.");
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
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Check password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      );
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
      navigate("/password/reset-success");
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="flex flex-1 flex-col bg-white">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#082368]"></div>
            <p className="text-gray-600">Validating reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="flex flex-1 flex-col bg-white">
        <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-4">
          <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-lg bg-white lg:flex-row">
            <div className="hidden w-full items-center justify-center p-6 pr-16 md:flex lg:w-2/3">
              <img
                src="/static/images/login.svg"
                alt="Login image"
                className="h-auto max-h-[450px] w-full rounded-lg object-cover"
              />
            </div>
            <div className="flex w-full flex-col justify-center p-8 lg:w-1/2">
              <div className="mb-8">
                <h2 className="font-nunito mb-6 text-4xl font-bold text-[#3A3A3A]">
                  Reset Password
                </h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {error}
                </div>
                <p className="font-nunito text-base text-gray-600">
                  The password reset link is invalid or has expired. Please
                  request a new one.
                </p>
                <div className="mt-6 flex justify-center">
                  <Link
                    to="/password/forgot"
                    className="font-nunito rounded-lg bg-[#082368] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#061a4a]"
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
    <div className="flex flex-1 flex-col bg-white">
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-4">
        <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-lg bg-white lg:flex-row">
          <div className="flex w-full items-center justify-center p-6 pr-16 lg:w-2/3">
            <img
              src="/static/images/login.svg"
              alt="Login image"
              className="h-auto max-h-[450px] w-full rounded-lg object-cover"
            />
          </div>

          <div className="flex w-full flex-col justify-center p-8 lg:w-1/2">
            <div className="mb-8">
              <h2 className="font-kaisei mb-6 text-4xl font-bold text-[#3A3A3A]">
                Reset Password
              </h2>
            </div>
            <p className="font-nunito mb-6 text-base text-gray-600">
              Enter your new password below.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="font-nunito font-semibold text-[#3A3A3A]"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                  className="font-nunito rounded-lg border border-gray-300 p-4 focus:border-[#082368] focus:outline-none"
                  placeholder="Enter your new password"
                  disabled={loading}
                />
                <div className="mt-2 text-sm text-gray-500">
                  Password Strength: {passwordStrength.score}/5
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.score <= 1
                        ? "bg-red-500"
                        : passwordStrength.score <= 2
                          ? "bg-orange-500"
                          : passwordStrength.score <= 3
                            ? "bg-yellow-500"
                            : passwordStrength.score <= 4
                              ? "bg-blue-500"
                              : "bg-green-500"
                    }`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
                <div
                  className={`mt-1 text-sm ${
                    passwordStrength.score <= 1
                      ? "text-red-500"
                      : passwordStrength.score <= 2
                        ? "text-orange-500"
                        : passwordStrength.score <= 3
                          ? "text-yellow-500"
                          : passwordStrength.score <= 4
                            ? "text-blue-500"
                            : "text-green-500"
                  }`}
                >
                  {passwordStrength.feedback}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="font-nunito font-semibold text-[#3A3A3A]"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="font-nunito rounded-lg border border-gray-300 p-4 focus:border-[#082368] focus:outline-none"
                  placeholder="Confirm your new password"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="font-nunito rounded-lg bg-[#082368] py-4 font-semibold text-white transition-colors hover:bg-[#061a4a] disabled:cursor-not-allowed disabled:opacity-50"
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
