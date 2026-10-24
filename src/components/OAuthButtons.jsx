import { FaFacebookF, FaGoogle } from "react-icons/fa";
import api from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function OAuthButtons() {
  const { t } = useLanguage();

  const startOAuth = (provider) => {
    window.location.assign(`${api.defaults.baseURL}/auth/${provider}`);
  };

  return (
    <div className="space-y-3">
      <button type="button" onClick={() => startOAuth("google")} className="theme-field theme-focus flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-3.5 font-semibold transition hover:brightness-105">
        <FaGoogle className="text-rose-500" />
        <span className="theme-text">{t("continueGoogle")}</span>
      </button>
      <button type="button" onClick={() => startOAuth("facebook")} className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1877f2] px-4 py-3.5 font-semibold text-white transition hover:bg-[#166fe5]">
        <FaFacebookF />
        <span>{t("continueFacebook")}</span>
      </button>
    </div>
  );
}
