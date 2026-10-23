import { BsCheck2All } from "react-icons/bs";
import { FiDownload, FiFile, FiMic, FiPhone, FiSmile } from "react-icons/fi";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const QUICK_REACTIONS = ["❤️", "👍", "😂", "😮", "😢", "🔥"];

function formatCallDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function emojiCounts(reactions) {
  const map = {};
  reactions?.forEach((r) => {
    map[r.emoji] = (map[r.emoji] || 0) + 1;
  });
  return map;
}

function userReacted(reactions, emoji, userId) {
  return reactions?.some((r) => String(r.emoji) === String(emoji) && String(r.userId) === String(userId));
}

export default function MessageBubble({ message, onToggleReaction, currentUserId }) {
  const isMe = message.from === "me";
  const [pickerOpen, setPickerOpen] = useState(false);
  const fileUrl = message.fileUrl || "";
  const isImage = fileUrl && (message.fileType || "").startsWith("image/");
  const isAudio = fileUrl && (message.fileType || "").startsWith("audio/");
  const isCall = message.system && message.callStatus;
  const counts = emojiCounts(message.reactions);
  const pickReaction = (emoji) => {
    onToggleReaction?.(message.id, emoji);
    setPickerOpen(false);
  };

  return (
    <div className={`pop flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div className={`message-bubble-group relative max-w-[75%] rounded-3xl px-4 py-2.5 ${isMe ? "bubble-me rounded-br-md text-white" : "glass theme-text rounded-bl-md"}`}>
        {!isCall && (
          <>
            <button
              type="button"
              onClick={() => setPickerOpen((open) => !open)}
              aria-label="Add reaction"
              aria-expanded={pickerOpen}
              className={`message-reaction-trigger ${isMe ? "-left-10" : "-right-10"}`}
            >
              <FiSmile size={16} />
            </button>
            {pickerOpen && (
              <div className={`message-reaction-picker ${isMe ? "right-0" : "left-0"}`} role="group" aria-label="Choose a reaction">
                {QUICK_REACTIONS.map((emoji) => (
                  <button key={emoji} type="button" onClick={() => pickReaction(emoji)} className="emoji-text message-reaction-option" aria-label={`React with ${emoji}`}>
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        {isCall && (
          <div className="call-message flex items-center gap-2 p-2.5 rounded-lg text-sm font-medium opacity-90">
            <FiPhone size={14} className="text-violet-500" />
            {message.callStatus === "ended" && (
              <>
                <span>Voice call</span>
                <span className="mx-1">•</span>
                <span>{formatCallDuration(message.callDuration)}</span>
              </>
            )}
            {message.callStatus === "answered" && <span>Voice call started</span>}
            {message.callStatus === "missed" && <span>Missed voice call</span>}
            {message.callStatus === "rejected" && <span>Call rejected</span>}
            {message.callStatus === "busy" && <span>User busy</span>}
          </div>
        )}

        {!isCall && isAudio ? (
          <div className={`voice-message ${isMe ? "voice-message-me" : "voice-message-them"}`}>
            <FiMic size={17} className="shrink-0" />
            <audio controls preload="metadata" src={`${API_BASE}${fileUrl}`} className="voice-message-player">
              Your browser cannot play this voice message.
            </audio>
          </div>
        ) : !isCall && isImage ? (
          <img
            src={`${API_BASE}${fileUrl}`}
            alt={message.fileName || "Image"}
            className="max-w-full rounded-xl"
            style={{ maxHeight: 320 }}
          />
        ) : !isCall && fileUrl ? (
          <a
            href={`${API_BASE}${fileUrl}`}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-2 rounded-xl p-2 ${isMe ? "bg-white/15" : "bg-black/5"}`}
          >
            <FiFile size={18} className="shrink-0" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{message.fileName || "File"}</span>
            <FiDownload size={14} className="shrink-0 opacity-70" />
          </a>
        ) : null}

        {!isCall && message.text && <p className="text-[15px] leading-relaxed emoji-text">{message.text}</p>}

        {!isCall && message.reactions && message.reactions.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {Object.entries(counts).map(([emoji, count]) => (
              <button
                key={emoji}
                type="button"
                onClick={() => pickReaction(emoji)}
                className={`flex items-center gap-1 rounded-xl px-2 py-1 text-xs ${userReacted(message.reactions, emoji, currentUserId) ? "bg-violet-500/20 text-violet-400" : "theme-soft theme-text"}`}
              >
                <span className="emoji-text">{emoji}</span>
                <span>{count}</span>
              </button>
            ))}
          </div>
        )}

        <div className={`mt-1 flex items-center gap-1 text-[11px] ${isMe ? "justify-end text-white/70" : "theme-muted"}`}>
          <span>{message.time}</span>
          {isMe && <BsCheck2All className={message.status === "seen" ? "text-sky-200" : "text-white/60"} />}
        </div>
      </div>
    </div>
  );
}
