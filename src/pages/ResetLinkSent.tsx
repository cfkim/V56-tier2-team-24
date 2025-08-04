
import { format } from "date-fns";
import loginImg from "/static/images/login.svg";

export default function ResetLinkSent() {
  const today = format(new Date(), "MMMM d, yyyy");

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

          {/* Right Content */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-4xl font-nunito font-bold text-[#3A3A3A] mb-6">Log In</h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-nunito font-semi text-[#3A3A3A]">
                Password reset link sent!
              </h3>
              <p className="text-gray-600 font-nunito text-base">
                Please check your email to reset your password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}