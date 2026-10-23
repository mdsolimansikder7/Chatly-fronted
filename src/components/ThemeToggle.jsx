import { FiMoon, FiSun } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={nextTheme === "light" ? t("switchToLight") : t("switchToDark")}
      title={nextTheme === "light" ? t("switchToLight") : t("switchToDark")}
      className={`theme-icon-button group relative inline-flex items-center justify-center overflow-hidden ${compact ? "h-10 w-10" : "h-11 gap-2 px-3"}`}
    >
      <span className="relative grid h-5 w-5 place-items-center">
        <FiSun className={`absolute transition-all duration-300 ${theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} size={18} />
        <FiMoon className={`absolute transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} size={18} />
      </span>
      {!compact && <span className="text-xs font-semibold">{theme === "dark" ? t("dark") : t("light")}</span>}
    </button>
  );
}
