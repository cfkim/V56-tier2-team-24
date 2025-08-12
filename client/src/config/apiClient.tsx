import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { navigate } from "../lib/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// to communicate w backend
const API = axios.create(options);

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response);

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await TokenRefreshClient.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const newAccessToken = response.data.accessToken;
  localStorage.setItem("accessToken", newAccessToken);
  return newAccessToken;
};

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

// Funnels requests
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config } = error;
    const { status, data } = error.response;

    // If access token expires
    if (status === 403 && !config._retry) {
      console.log("token expired");
      config._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Attempts to refresh the token
          const newAccessToken = await refreshToken();

          // Tries the original request again with the new token
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          refreshAndRetryQueue.forEach((item) => {
            item.resolve(API(item.config));
          });
          refreshAndRetryQueue.length = 0;
          return API(config);
        } catch (error) {
          // If token refresh fails remove local storage and navigate back to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          if (window.location.pathname !== "/") {
            navigate("/login", {
              state: { redirectUrl: window.location.pathname },
            });
          }
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ resolve, reject, config });
      });
    }
    return Promise.reject({ status, ...data });
  },
);

export default API;
