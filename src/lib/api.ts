import API from "../config/apiClient";
import queryClient from "../config/queryClient";
import { navigate } from "./navigation";

interface data {
  email: string;
  password: string;
}

export const login = async (data: data) => API.post("/auth/login", data);
export const getUser = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await API.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res)
  return res;
};

export const logout = async () => {
  const token = localStorage.getItem("refreshToken");
  const res = await API.get("/auth/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  navigate("/login");
  queryClient.clear();
  return res;
}