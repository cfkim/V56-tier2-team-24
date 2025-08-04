import API from "../config/apiClient";
import queryClient from "../config/queryClient";
import type { LoginResponse } from "../types/LoginResponse";
import { navigate } from "./navigation";

// Sign in data
interface signInData {
  email: string;
  password: string;
  rememberMe: Boolean;
}

// -- FUNCTIONS FOR MAKING API REQUESTS --
export const login = async (data: signInData): Promise<LoginResponse> =>
  API.post("/auth/login", data);

export const getUser = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await API("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const logout = async () => {
  console.log("logout clicked");
  const token = localStorage.getItem("refreshToken");
  const res = await API.get("/auth/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Ends session by removing tokens from browser
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Redirects user to login page
  navigate("/login", { state: { redirectUrl: window.location.pathname } });
  queryClient.clear();

  return res;
};
