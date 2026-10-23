
import axios from "axios";

const apiUrl = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${apiUrl}/api`,
  timeout: 20000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("chatly-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
