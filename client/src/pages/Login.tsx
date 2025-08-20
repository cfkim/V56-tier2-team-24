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
      <div className="flex w-full flex-row justify-between p-9">
        <div className="hidden h-full w-1/2 justify-center lg:flex">
          <LoginArt className="h-auto rounded-t-[3.125rem]" />
        </div>
        <div className="flex w-full justify-center">
          <div className="font-nunito flex w-full flex-col items-center justify-center bg-white text-sm sm:max-w-10/12 sm:text-base">
            <h1 className="font-kaisei w-full py-6 text-center text-xl font-bold sm:mb-12 sm:text-left sm:text-4xl">
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
              <div className="mb-4 flex flex-col gap-2 sm:mb-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  autoFocus
                  placeholder="user@chinguhospital.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 rounded-[12px] bg-gray-100 p-3 drop-shadow-sm/25 focus:outline-blue-500"
                />
              </div>
              <div className="flex flex-col gap-2 sm:mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 rounded-[12px] bg-gray-100 p-3 drop-shadow-sm/25 focus:outline-blue-500"
                />
              </div>
              <div className="my-6 flex flex-row justify-between sm:mb-4">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember">Remember Me</label>
                </div>

                <Link className="underline" to="/password/forgot">
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="bg-primary max-w- w-full cursor-pointer rounded-[12px] py-[13px] text-white disabled:opacity-50"
                disabled={!email || password.length < 6}
              >
                {isPending ? <p>...</p> : <p>Log In</p>}
              </button>
            </form>
            <hr className="mt-9 w-full border-[#DDE1E6] sm:mb-10" />
            <div className="flex w-full p-3.5 text-xs text-[#656669] sm:text-lg">
              <p>
                No account yet? Please visit the <strong>reception area</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
