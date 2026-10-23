import { io } from "socket.io-client";

let socket;
const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function connectSocket(token) {
  if (socket?.connected) return socket;
  socket = io(serverUrl, { auth: { token } });
  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = undefined;
}
