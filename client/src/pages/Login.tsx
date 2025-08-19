import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginArt from "../assets/images/login.svg?react";
import { login } from "../lib/api";
import {
  useAuthActions,
  useIsHydrated,
  useIsLoggedIn,
} from "../stores/authStore";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(Boolean);

  const { login: loginAction } = useAuthActions();
  const isHydrated = useIsHydrated();
  const isLoggedIn = useIsLoggedIn();

  // added to handle navigation to login page under different auth states
  useEffect(() => {
    if (!isHydrated) return;
    if (isLoggedIn) navigate("/", { replace: true });
  }, []);

  // Handles the function call to sign in
  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      loginAction({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
        rememberMe,
      });

      navigate("/", { replace: true });
    },
  });

  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <div className="flex h-full w-1/2 justify-center">
          <LoginArt className="mb-8 h-auto rounded-t-[3.125rem]" />
        </div>
        <div className="font-nunito flex w-1/2 flex-col items-center justify-center bg-white px-30">
          <h1 className="font-kaisei mb-12 w-full text-xl font-bold sm:text-4xl">
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

              <Link to="/password/forgot">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="bg-primary mb-20 w-full cursor-pointer rounded-[12px] py-[13px] text-white disabled:opacity-50"
              disabled={!email || password.length < 6}
            >
              {isPending ? <p>...</p> : <p>Log In</p>}
            </button>
          </form>
          <hr className="mb-10 w-full border-[#DDE1E6]" />
          <div className="flex w-full">
            <p>
              No account yet? Please visit the <strong>reception area</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
