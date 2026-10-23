import { useLanguage } from "../context/LanguageContext";

export default function TypingIndicator({ name }) {
  const { t } = useLanguage();
  return (
    <div className="pop flex items-center gap-2">
      <div className="glass flex gap-1 rounded-3xl rounded-bl-md px-4 py-3">
        <span className="dot h-2 w-2 rounded-full bg-gray-300" />
        <span className="dot h-2 w-2 rounded-full bg-gray-300" />
        <span className="dot h-2 w-2 rounded-full bg-gray-300" />
      </div>
      <span className="theme-muted text-xs">{t("typing", { name })}</span>
    </div>
  );
}
