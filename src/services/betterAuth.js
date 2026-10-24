import { createAuthClient } from "better-auth/react";

const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export const betterAuthClient = createAuthClient({
  baseURL: apiUrl,
  basePath: "/api/better-auth",
  fetchOptions: {
    credentials: "include",
  },
});
