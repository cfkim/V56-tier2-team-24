import axios from "axios";
import { navigate } from "../lib/navigation";
import queryClient from "./queryClient";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// to communicate w backend
const API = axios.create(options);

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response);

// Funnels requests
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config } = error;
    const { status, data } = error.response;

    // If access token expires
    if (status === 403) {
      console.log(
        'token expired'
      )
      try {
        // Attempts to refresh the token
        const response = await TokenRefreshClient.get("/auth/refresh", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        });
        console.log("API ClIENT")
        console.log(response.data)
        // Sets new access token in local storage
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Tries the original request again with the new token
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newAccessToken}`;

        return TokenRefreshClient(config);
      } catch (error) {
        // If token refresh fails navigate back to login
        if (window.location.pathname !== "/") {
          navigate("/login", {
            state: { redirectUrl: window.location.pathname },
          });
        }

        queryClient.clear();
      }
      return Promise.reject({ status, ...data });
    }
  },
);

export default API;
