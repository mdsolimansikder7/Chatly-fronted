```js
import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "Chatly API error:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Chatly network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
```