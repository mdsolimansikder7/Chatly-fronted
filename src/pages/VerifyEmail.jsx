import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeToggle from "../components/ThemeToggle";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const started = useRef(false);
  const [state, setState] = useState("verifying");

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const token = new URLSearchParams(location.search).get("token");
    if (!token) {
      setState("error");
      return;
    }

    api.post("/auth/verify-email", { token })
      .then(() => {
        setState("success");
        navigate("/verify-email", { replace: true });
      })
      .catch(() => setState("error"));
  }, [location.search, navigate]);

  const title = state === "verifying"
    ? t("verifyingEmail")
    : state === "success"
      ? t("emailVerified")
      : t("verificationFailed");

  return (
    <div className="bg-aurora relative flex min-h-screen items-center justify-center p-4">
      <div className="absolute right-5 top-5 z-10 flex gap-2"><LanguageSwitcher /><ThemeToggle /></div>
      <main className="glass relative z-10 w-full max-w-md rounded-[2rem] p-8 text-center sm:p-10">
        <span className="brand-ring mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-xl font-bold text-white">C</span>
        <h1 className="mt-5 bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">Chatly</h1>
        <h2 className="theme-text mt-6 text-xl font-semibold">{title}</h2>
        <p role={state === "error" ? "alert" : "status"} className="theme-muted mt-3 text-sm">
          {state === "verifying" ? t("pleaseWait") : state === "success" ? t("verifiedSignIn") : t("verificationLinkInvalid")}
        </p>
        {state !== "verifying" && <Link to="/login" className="mt-7 inline-block rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 font-semibold text-white">{t("login")}</Link>}
      </main>
    </div>
  );
}
