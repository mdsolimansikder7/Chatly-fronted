import { useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeToggle from "../components/ThemeToggle";
import api from "../services/api";
import { saveSession } from "../services/session";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [canResendVerification, setCanResendVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setNotice("");
    setCanResendVerification(false);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      saveSession(data);
      navigate("/chat");
    } catch (requestError) {
      if (requestError?.response?.data?.code === "EMAIL_NOT_VERIFIED") {
        setError(t("emailNotVerified"));
        setCanResendVerification(true);
      } else {
        setError(requestError?.response?.data?.message || t("loginError"));
      }
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    setResending(true);
    setError("");
    setNotice("");
    try {
      await api.post("/auth/resend-verification", { email });
      setNotice(t("verificationResent"));
      setCanResendVerification(false);
    } catch (requestError) {
      setError(requestError?.response?.status === 429
        ? t("verificationWait")
        : requestError?.response?.data?.message || t("verificationResendError"));
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="bg-aurora relative flex min-h-screen items-center justify-center p-4">
      <div className="absolute right-5 top-5 z-10 flex gap-2"><LanguageSwitcher /><ThemeToggle /></div>
      <form onSubmit={handleSubmit} className="glass relative z-10 w-full max-w-md rounded-[2rem] p-8 sm:p-10">
        <div className="mb-8 text-center">
          <span className="brand-ring mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-xl font-bold text-white">C</span>
          <h1 className="mt-5 bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent">Chatly</h1>
          <p className="theme-muted mt-2 text-sm">{t("loginWelcome")}</p>
        </div>
        {error && <p className="mb-4 rounded-xl bg-rose-500/10 px-3 py-2.5 text-sm text-rose-500">{error}</p>}
        {notice && <p role="status" className="mb-4 rounded-xl bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-600">{notice}</p>}
        {canResendVerification && <button type="button" disabled={resending} onClick={resendVerification} className="mb-4 w-full rounded-xl border border-violet-500/30 py-2.5 text-sm font-semibold text-violet-500 disabled:opacity-70">{resending ? t("sending") : t("resendVerification")}</button>}
        <label className="theme-field theme-focus mb-4 flex items-center gap-3 rounded-2xl px-4 py-3.5">
          <FiMail className="theme-muted" />
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder={t("email")} required className="theme-text w-full bg-transparent outline-none placeholder:text-gray-400" />
        </label>
        <label className="theme-field theme-focus mb-6 flex items-center gap-3 rounded-2xl px-4 py-3.5">
          <FiLock className="theme-muted" />
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder={t("password")} required className="theme-text w-full bg-transparent outline-none placeholder:text-gray-400" />
        </label>
        <button disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:scale-[1.02] active:scale-95 disabled:cursor-wait disabled:opacity-70">{loading ? t("loggingIn") : t("login")}</button>
        <p className="theme-muted mt-6 text-center text-sm">{t("noAccount")} <Link to="/register" className="font-semibold text-violet-500 hover:underline">{t("register")}</Link></p>
      </form>
    </div>
  );
}
