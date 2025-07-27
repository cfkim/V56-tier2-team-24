import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="w-full bg-[#ECECEC] flex flex-row justify-between outline">
        <div className="h-full py-40"></div>
        <div className="w-1/2 bg-white py-40 flex flex-col justify-center items-center p-30">
          <h1 className="w-full text-5xl mb-12 font-semibold">Log In</h1>
          <form className="w-full" action="">
            <div className="flex flex-col mb-3 gap-1">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 rounded-[12px] h-10 p-3 outline"
              />
            </div>
            <div className="flex flex-col mb-4 gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 rounded-[12px] h-10 p-3 outline"
              />
            </div>
            <div className="flex flex-row mb-4 justify-between">
              <div className="flex gap-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>

              <Link to="/password/forgot">Forgot Password?</Link>
            </div>
            <button
              className="bg-[#555555] text-white rounded-[12px] py-[13px] w-full mb-75 disabled:bg-[#b3b3b3]"
              disabled={!email || password.length < 6}
            >
              Login
            </button>
          </form>
          {/* Commenting out since no longer doing OAuth Google and Apple */}
          {/* <div className="flex w-full flex-row gap-3 mb-25">
            <button className="border outline-[1.5px] border-[#929292] text-[#929292] rounded-[12px] py-[3px] w-full flex flex-row justify-center items-center gap-3 text-sm">
              <img
                src="./public/static/images/google.png"
                alt=""
                className="p-1"
              />
              <p>Login with Google</p>
            </button>
            <button className="border outline-[1.5px] border-[#929292] text-[#929292] rounded-[12px] py-[3px] w-full flex flex-row justify-center items-center gap-3 text-sm">
              <img
                src="./public/static/images/apple.png"
                alt=""
                className="p-1"
              />
              <p>Login with Apple</p>
            </button>
          </div> */}
          <hr className="border-[#DDE1E6] w-full mb-10" />
          <div className="w-full flex">
            <p>No account yet? Sign Up</p>
          </div>
        </div>
      </div>
    </>
  );
}
