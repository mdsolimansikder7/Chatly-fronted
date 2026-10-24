import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import { saveSession } from "../services/session";

export default function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const started = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    window.history.replaceState(null, "", location.pathname);

    if (!code) {
      setFailed(true);
      return;
    }

    api.post("/auth/oauth/exchange", { code })
      .then(({ data }) => {
        saveSession(data);
        navigate("/chat", { replace: true });
      })
      .catch(() => setFailed(true));
  }, [location.pathname, location.search, navigate]);

  return (
    <div className="bg-aurora relative flex min-h-screen items-center justify-center p-4">
      <main className="glass relative z-10 w-full max-w-md rounded-[2rem] p-8 text-center sm:p-10">
        <h1 className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">Chatly</h1>
        <p role={failed ? "alert" : "status"} className="theme-muted mt-5 text-sm">
          {failed ? t("oauthError") : t("oauthLoading")}
        </p>
        {failed && <Link to="/login" className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 font-semibold text-white">{t("login")}</Link>}
      </main>
    </div>
  );
}
