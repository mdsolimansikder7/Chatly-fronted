import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./pages/RealTimeChat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import { getSession } from "./services/session";

function HomeRedirect() {
  return <Navigate to={getSession() ? "/chat" : "/login"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
