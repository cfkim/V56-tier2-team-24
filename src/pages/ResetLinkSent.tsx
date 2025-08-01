import Footer from "../components/Footer";
import { format } from "date-fns";
import loginImg from "/static/images/login.svg";

export default function ResetLinkSent() {
  const today = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center px-8 pt-4">
        <h1 className="text-lg font-bold text-[#3A3A3A]">Lumo</h1>
        <p className="text-sm text-gray-500">{today}</p>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 bg-gray-200 flex justify-center items-center">
          <img src={loginImg} alt="Login visual" className="max-w-full " />
        </div>

        <div className="w-full max-w-2xl bg-white shadow-lg p-10 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Password reset link sent!</h2>
          <p className="text-gray-600">
            Please check your email. You’ll find a secure link to reset your password.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}