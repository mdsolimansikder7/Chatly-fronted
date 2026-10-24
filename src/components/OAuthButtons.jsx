import { FcGoogle } from "react-icons/fc";
import api from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function OAuthButtons() {
  const { t } = useLanguage();

  const startOAuth = (provider) => {
    window.location.assign(`${api.defaults.baseURL}/auth/${provider}`);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => startOAuth("google")}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/20 active:scale-[0.99]"
      >
        <FcGoogle className="text-xl transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
        <span>{t("signInGoogle")}</span>
      </button>
    </div>
  );
}
