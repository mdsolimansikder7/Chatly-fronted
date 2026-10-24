import { createAuthClient } from "better-auth/react";

export const betterAuthClient = createAuthClient({
  baseURL: window.location.origin,
  basePath: "/api/better-auth",
  fetchOptions: {
    credentials: "include",
  },
});
