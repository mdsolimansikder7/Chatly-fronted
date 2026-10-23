import { FiGlobe } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`language-switcher ${compact ? "language-switcher-compact" : ""}`} role="group" aria-label={t("language")}>
      {!compact && <span className="language-globe"><FiGlobe size={16} /></span>}
      <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"} className={`language-option ${language === "en" ? "language-option-active" : ""}`}>EN</button>
      <button type="button" onClick={() => setLanguage("bn")} aria-pressed={language === "bn"} className={`language-option ${language === "bn" ? "language-option-active" : ""}`}>বাংলা</button>
    </div>
  );
}
