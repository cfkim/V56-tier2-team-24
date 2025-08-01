
import axios from "axios";
import queryClient from "./queryClient";
import { navigate } from "../lib/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// to communicate w backend
const API = axios.create(options);

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

// Funnels requests
API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => { 
    const { config } = error;
    const { status, data } = error.response;
    
    // If access token expires
    if (status === 403) {
      try{
        
        // Attempts to refresh the token
        const res = await TokenRefreshClient.get("/auth/refresh", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
          }
        });

        // Sets new access token in local storage
        const newAccessToken = res.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Tries the original request again with the new token
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        
        return TokenRefreshClient(config);
      }catch (error) {
        // If token refresh fails navigate back to login
        if (window.location.pathname !== "/"){
          navigate("/login", {state: {redirectUrl: window.location.pathname}})
        }
        
        queryClient.clear();
      }
    return Promise.reject({ status, ...data });
  }}
);

export default API;
