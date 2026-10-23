export { default } from "./RealTimeChat";

/* Legacy mock implementation kept as an implementation reference.
import { useRef, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import Sidebar from "../components/Sidebar";
import SettingsPanel from "../components/SettingsPanel";
import { initialChats } from "../data/mockData";

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const defaultProfile = {
  name: "Soliman",
  email: "soliman@example.com",
  role: "Available",
  bio: "Building meaningful conversations, one message at a time.",
  avatar: "",
};

const getSavedProfile = () => {
  try {
    return { ...defaultProfile, ...JSON.parse(localStorage.getItem("chatly-profile")) };
  } catch {
    return defaultProfile;
  }
};

export default function Chat() {
  const [chats, setChats] = useState(initialChats);
  const [activeId, setActiveId] = useState(null);
  const [typingChatId, setTypingChatId] = useState(null);
  const [profile, setProfile] = useState(getSavedProfile);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const replyTimerRef = useRef(null);
  const activeChat = chats.find((chat) => chat.id === activeId);

  const addMessage = (chatId, from, text) => {
    setChats((previousChats) => previousChats.map((chat) => (
      chat.id === chatId
        ? { ...chat, messages: [...chat.messages, { id: crypto.randomUUID(), from, text, time: now() }] }
        : chat
    )));
  };

  const handleSend = (text) => {
    if (!activeId) return;
    const chatId = activeId;
    addMessage(chatId, "me", text);
    setTypingChatId(chatId);
    window.clearTimeout(replyTimerRef.current);
    replyTimerRef.current = window.setTimeout(() => {
      setTypingChatId(null);
      addMessage(chatId, "them", "Ok, bujhlam 👍");
    }, 1500);
  };

  const handleSelect = (id) => {
    setActiveId(id);
    setChats((previousChats) => previousChats.map((chat) => (chat.id === id ? { ...chat, unread: 0 } : chat)));
  };

  const handleProfileSave = (nextProfile) => {
    setProfile(nextProfile);
    localStorage.setItem("chatly-profile", JSON.stringify(nextProfile));
  };

  return (
    <div className="bg-aurora h-dvh min-h-[32rem] p-3 md:p-5">
      <div className="relative z-10 mx-auto flex h-full max-w-7xl gap-4">
        <div className={`${activeChat ? "hidden md:block" : "block"} h-full w-full md:w-auto`}>
          <Sidebar chats={chats} activeId={activeId} onSelect={handleSelect} profile={profile} onOpenSettings={() => setSettingsOpen(true)} />
        </div>
        <main className={`${activeChat ? "flex" : "hidden md:flex"} glass h-full min-w-0 flex-1 flex-col overflow-hidden rounded-3xl`}>
          {activeChat ? (
            <>
              <ChatHeader chat={activeChat} onBack={() => setActiveId(null)} />
              <MessageList messages={activeChat.messages} typing={typingChatId === activeChat.id} name={activeChat.name} />
              <MessageInput onSend={handleSend} />
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
              <div className="chat-empty-icon float-soft rounded-[1.75rem] bg-gradient-to-br from-violet-500 to-pink-500 p-6 text-white"><FiMessageCircle size={40} /></div>
              <div>
                <p className="theme-text text-xl font-bold">Chatly-তে স্বাগতম</p>
                <p className="theme-muted mt-2 text-sm">বাম পাশ থেকে একটা chat select করো</p>
              </div>
              <div className="theme-soft theme-muted rounded-2xl px-4 py-2 text-xs">Your conversations stay right where you need them.</div>
            </div>
          )}
        </main>
      </div>
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} profile={profile} onSave={handleProfileSave} />
    </div>
  );
}
*/
