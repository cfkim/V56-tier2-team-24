import API from "../config/apiClient";

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
  
  return res;
};