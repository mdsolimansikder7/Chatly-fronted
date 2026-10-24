
import { io } from "socket.io-client";

let socket;

const serverUrl = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

export function connectSocket(token) {
  if (socket) {
    if (socket.connected) return socket;

    // Reuse the socket and update authentication.
    socket.auth = { token };
    socket.connect();
    return socket;
  }

  socket = io(serverUrl, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
  });

  socket.on("connect", () => {
    console.log("Chatly Socket connected:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Chatly Socket connection error:", error.message);
  });

  socket.on("disconnect", (reason) => {
    console.warn("Chatly Socket disconnected:", reason);
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = undefined;
  }
}
