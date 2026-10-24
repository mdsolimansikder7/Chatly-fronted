import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { betterAuthClient } from "../services/betterAuth";

export default function OAuthButtons() {
  const { t } = useLanguage();
  const [error, setError] = useState("");

  const startGoogleSignIn = async () => {
    setError("");
    try {
      const { error: signInError } = await betterAuthClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/oauth/callback`,
      });
      if (signInError) setError(t("oauthError"));
    } catch {
      setError(t("oauthError"));
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={startGoogleSignIn}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/20 active:scale-[0.99]"
      >
        <FcGoogle className="text-xl transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
        <span>{t("signInGoogle")}</span>
      </button>
      {error && <p role="alert" className="mt-3 text-center text-sm text-rose-500">{error}</p>}
    </div>
  );
}
