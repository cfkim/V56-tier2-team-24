import API from "../config/apiClient";
import queryClient from "../config/queryClient";
// import type { LoginResponse } from "../types/LoginResponse";
import { navigate } from "./navigation";

// Sign in data
interface signInData {
  email: string;
  password: string;
  rememberMe: Boolean;
}

// -- FUNCTIONS FOR MAKING API REQUESTS --
// export const login = async (data: signInData): Promise<LoginResponse> =>
//   API.post("/auth/login", data);
export const login = async (data: signInData) => API.post("/auth/login", data);

export const getUser = async () => {

  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");

  const response = await API("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("API endpoint");
  console.log(response);

  return response;
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

// for forgot password
// sends email to forgot password endpoint
export const forgotPassword = async(email: string) => {
  const response = API.post('/password/forgot', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  return response
}

// resets the password with new password
export const resetPassword = async(token: string, email: string, password: string) => {
  const response = API.post('/password/reset', {
    method: 'POST',
    body: JSON.stringify({ token, email, password }),
  });

  return response;
}

// sends token to verify
export const verifyResetToken = async (token: string, email: string) => {
  const response = API.post('/password/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token, email }),
    });

    return response;
}
