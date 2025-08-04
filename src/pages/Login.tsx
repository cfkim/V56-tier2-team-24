import { Link } from "react-router-dom";
import { format } from "date-fns";
import loginImg from "/static/images/login.svg";

export default function Login() {
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

          {/* Right Form */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-4xl font-nunito font-bold text-[#3A3A3A] mb-6">Log In</h2>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-nunito font-semibold text-[#3A3A3A]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="p-4 rounded-lg border border-gray-300 font-nunito focus:outline-none focus:border-[#082368]"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-nunito font-semibold text-[#3A3A3A]">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="p-4 rounded-lg border border-gray-300 font-nunito focus:outline-none focus:border-[#082368]"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="bg-[#082368] text-white rounded-lg py-4 font-nunito font-semibold hover:bg-[#061a4a] transition-colors"
              >
                Log In
              </button>
              <div className="flex justify-center mt-4">
                <Link
                  to="/password/forgot"
                  className="text-[#082368] font-nunito underline hover:no-underline"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 