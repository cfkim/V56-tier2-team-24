import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/api";
// import type { LoginResponse } from "../types/LoginResponse";
import type { Role } from "../types/Role";

export default function Login({
  setUser,
  setIsLoggedIn,
  setRole,
}: {
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setRole: React.Dispatch<React.SetStateAction<Role | undefined>>;
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(Boolean);

  // Handles the function call to sign in
  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      // Saves tokens to storage

      window.localStorage.setItem("accessToken", response.data.accessToken);

      // Only saves refresh token if rememberMe checked
      if (rememberMe) {
        window.localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      // Sets App's logged in state and the role of the user
      setIsLoggedIn(true);
      setUser(response.data.user);
      setRole(response.data.user.role);
      navigate("/", { replace: true });
    },
  });

  // Test login function for development
  const handleTestLogin = (role: Role) => {
    const testUser = {
      _id: "test-id",
      email: `${role}@test.com`,
      role: role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    };

    // Set test token
    window.localStorage.setItem("accessToken", "test-token");
    
    // Set user state
    setIsLoggedIn(true);
    setUser(testUser);
    setRole(role);
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <div className="flex h-full w-1/2 justify-center">
          <img
            src="static/images/login.svg"
            alt=""
            className="mb-8 h-auto rounded-t-[3.125rem]"
          />
        </div>
        <div className="font-nunito flex w-1/2 flex-col items-center justify-center bg-white px-30">
          <h1 className="font-kaisei mb-12 w-full cursor-pointer text-xl font-bold sm:text-4xl">
            Log In
          </h1>
          {isError && (
            <div className="text-red-500">Invalid email or password.</div>
          )}
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              signIn({ email, password, rememberMe });
            }}
          >
            <div className="mb-3 flex flex-col gap-1">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-[12px] bg-gray-100 p-3 drop-shadow-sm/25 focus:outline-blue-500"
              />
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-[12px] bg-gray-100 p-3 drop-shadow-sm/25 focus:outline-blue-500"
              />
            </div>
            <div className="mb-4 flex flex-row justify-between">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember Me</label>
              </div>

              <Link
                to="/password/forgot"
                className="text-primary hover:text-primary/80"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="mb-4 h-10 w-full rounded-[12px] bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Test Login Buttons for Development */}
          <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Test Login (Development)</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleTestLogin("admin")}
                className="flex-1 h-8 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Login as Admin
              </button>
              <button
                onClick={() => handleTestLogin("surgeon")}
                className="flex-1 h-8 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700"
              >
                Login as Surgeon
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
