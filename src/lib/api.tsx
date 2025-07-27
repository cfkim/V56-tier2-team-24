import API from "../config/apiClient";

interface data {
  email: string;
  password: string;
}

export const login = async (data: data) => API.post("/auth/login", data);
