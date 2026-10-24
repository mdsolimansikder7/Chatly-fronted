import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./pages/RealTimeChat";
import Login from "./pages/Login";
import OAuthCallback from "./pages/OAuthCallback";
import Register from "./pages/Register";
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
      <Route path="/oauth/callback" element={<OAuthCallback />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}
