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
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");

  const response = await API("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const logout = async () => {
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

export const getStatusList = async () => {
  console.log("getting status list for patients")
  const res = await API.get("/status")
  return res
}

// gets all patients
export const getPatients = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await API.get("/patient/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// adds a patient
export const addPatient = async (formData: FormData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token");

  const formObj = Object.fromEntries(formData.entries());

  try {
    const res = await API.post("/patient/create", formObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Failed to add patient", error);
    throw error;
  }
};

// gets a new patient number
export const getNewPatientId = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await API.get("/patient/patientId", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// for forgot password
// sends email to forgot password endpoint
export const forgotPassword = async (email: string) => {
  const response = API.post("/auth/password/forgot", { email });

  return response;
};

// resets the password with new password
export const resetPassword = async (
  code: string,
  uid: string,
  password: string,
) => {
  const response = API.post("/auth/password/reset", { code, uid, password });

  return response;
};

// sends token to verify
export const verifyResetToken = async (code: string, uid: string) => {
  const response = API.post("/auth/password/verify", { code, uid });

  return response;
};
