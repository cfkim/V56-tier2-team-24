import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/api";
import type { Role } from "../types/Role";

export default function Login({setIsLoggedIn, setRole}: {setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>, setRole: React.Dispatch<React.SetStateAction<Role | undefined>>}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(Boolean)

  // Handles the function call to sign in
  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      // Saves tokens to storage
      window.localStorage.setItem("accessToken", response.accessToken);
      
      // Only saves refresh token if rememberMe checked
      if(rememberMe){
        window.localStorage.setItem("refreshToken", response.refreshToken);
      }
      
      // Set App's logged in state and the role of the user
      setIsLoggedIn(true);
      setRole(response.user.role)

      navigate("/", { replace: true });
    },
  });

  return (
    <>
      <div className="w-full  flex flex-row justify-between">
        <div className="flex justify-center w-1/2 h-full">
        <img src="static/images/login.svg" alt="" className="rounded-t-[3.125rem] h-auto mb-8"/></div>
        <div className="w-1/2 bg-white flex flex-col justify-center items-center px-30">
          <h1 className="w-full text-5xl mb-12 font-semibold">Log In</h1>
          {isError && (
            <div className=" text-red-500">Invalid email or password.</div>
          )}
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              signIn({ email, password, rememberMe });
            }}
          >
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
                <input type="checkbox" id="remember" onChange={(e) => setRememberMe(e.target.checked)}/>
                <label htmlFor="remember">Remember Me</label>
              </div>

              <Link to="/password/forgot">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="bg-[#555555] text-white rounded-[12px] py-[13px] w-full mb-20 disabled:bg-[#b3b3b3]"
              disabled={!email || password.length < 6}
            >
              {isPending ? <p>...</p> : <p>Log In</p>}
            </button>
          </form>
          <hr className="border-[#DDE1E6] w-full mb-10" />
          <div className="w-full flex">
            <p>
              No account yet? Please visit the <strong>reception area</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
