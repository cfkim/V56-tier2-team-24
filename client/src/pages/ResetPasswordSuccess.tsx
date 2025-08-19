import { Link } from "react-router-dom";

export default function ResetPasswordSuccess() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Main content */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-4">
        <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-lg bg-white lg:flex-row">
          {/* Left Image */}
          <div className="flex w-full items-center justify-center p-6 pr-16 lg:w-2/3">
            <img
              src="/static/images/login.svg"
              alt="Login image"
              className="h-auto max-h-[450px] w-full rounded-lg object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="flex w-full flex-col justify-center p-8 lg:w-1/2">
            <div className="mb-8">
              <h2 className="font-kaisei mb-6 text-4xl font-bold text-[#3A3A3A]">
                Log In
              </h2>
            </div>
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-nunito mb-2 text-2xl font-semibold text-[#3A3A3A]">
                  Password reset successfully!
                </h3>
                <p className="font-nunito text-base text-gray-600">
                  Your password has been updated. You can now log in with your
                  new password.
                </p>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="font-nunito text-sm text-green-800">
                  <strong>Security tip:</strong> Make sure to use a strong,
                  unique password and never share it with anyone.
                </p>
              </div>

              <div className="flex justify-center">
                <Link
                  to="/login"
                  className="font-nunito rounded-lg bg-[#082368] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#061a4a]"
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
