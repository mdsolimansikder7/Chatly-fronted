import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useLanguage } from "../context/LanguageContext";

export default function MessageList({ messages, typing, name, wallpaperClass = "", onToggleReaction, currentUserId }) {
  const bottomRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <section className={`flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:px-5 sm:py-4 ${wallpaperClass}`} aria-label="Messages">
      <div className="flex justify-center">
        <span className="theme-soft theme-muted rounded-full px-3 py-1 text-xs font-medium">{t("today")}</span>
      </div>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} onToggleReaction={onToggleReaction} currentUserId={currentUserId} />
      ))}
      {typing && <TypingIndicator name={name} />}
      {messages.length === 0 && !typing && (
        <p className="theme-muted px-3 py-8 text-center text-sm">{t("chatClearedEmpty")}</p>
      )}
      <div ref={bottomRef} />
    </section>
  );
}
