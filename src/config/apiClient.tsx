import axios from "axios";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// returns an axios instance to communicate w backend
const API = axios.create(options);

// -
API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error.response);
    const { status, data } = error.response;
    return Promise.reject({ status, ...data });
  }
);

export default API;
