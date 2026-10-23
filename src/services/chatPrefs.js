const STORAGE_KEY = "chatly-prefs";

const emptyPrefs = () => ({ muted: false, pinned: false, favorite: false, nickname: "", wallpaper: -1 });

function loadAll() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveAll(allPrefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allPrefs));
}

export function getChatPrefs(chatId) {
  if (!chatId) return emptyPrefs();
  return { ...emptyPrefs(), ...(loadAll()[chatId] || {}) };
}

export function setChatPref(chatId, key, value) {
  if (!chatId) return;
  const allPrefs = loadAll();
  allPrefs[chatId] = { ...emptyPrefs(), ...(allPrefs[chatId] || {}), [key]: value };
  saveAll(allPrefs);
}
