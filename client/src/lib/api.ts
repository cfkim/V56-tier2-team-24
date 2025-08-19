import API from "../config/apiClient";
import queryClient from "../config/queryClient";
import { getRefreshToken, performLogout } from "../stores/authStore";
import { navigate } from "./navigation";

// Sign in data
interface signInData {
  email: string;
  password: string;
  rememberMe: Boolean;
}

// -- FUNCTIONS FOR MAKING API REQUESTS --
export const login = async (data: signInData) => API.post("/auth/login", data);

export const getUser = () => API.get("/user");

export const logout = async () => {
  try {
    const refreshToken = getRefreshToken();
    await API.get("/auth/logout", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  } catch (error) {
    console.error("Failed to logout", error);
    throw error;
  }
  performLogout();
  queryClient.clear();
  navigate("/login", { state: { redirectUrl: window.location.pathname } });
};

export const getStatusList = async () => API.get("/status");
// gets all patients
export const getPatients = async () => API.get("/patient/all");

// adds a patient
export const addPatient = async (formData: FormData) => {
  const formObj = Object.fromEntries(formData.entries());
  return API.post("/patient/create", formObj);
};

export const editPatient = async (formData: FormData) => {
  const formObj = Object.fromEntries(formData.entries());
  return API.post("/patient/update", formObj);
};

// gets a new patient number
export const getNewPatientId = async () => API.get("/patient/patientId");

// ------
// gets patient by ID
export const getPatientById = async (patientId: string) => {
  const res = await API.get(`/patient/${patientId}`);
  return res;
};

// updates patient status
export const updatePatientStatus = async (
  patientId: string,
  newStatus: string,
) => {
  const res = await API.post("/patient/update-status", {
    patientId,
    newStatus,
  });
  return res;
};
// ------

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
