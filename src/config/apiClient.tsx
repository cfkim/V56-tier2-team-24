
import axios from "axios";
import queryClient from "./queryClient";
import { navigate } from "../lib/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// returns an axios instance to communicate w backend
const API = axios.create(options);

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

// -
API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { config, response } = error;
    console.log(error.response);
    const { status, data } = error.response;

    if (status == 401 && data?.errorCode === "TOKEN_EXPIRED") {
      try{
        const res = await TokenRefreshClient.get("/auth/refresh", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
          }
        });

        const newAccessToken = res.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        console.log('refreshed token')
        // try the same request again with the new token
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(config);
      }catch (error) {
        queryClient.clear();
        console.error("Token refresh failed:", error);
        
      }
    return Promise.reject({ status, ...data });
  }}
);

export default API;
