const RTC_CONFIG = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

let ringtoneCtx = null;
let ringtoneGain = null;
let ringtoneOsc1 = null;
let ringtoneOsc2 = null;
let ringtoneTone = null;

function startRingtone() {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  ringtoneCtx = new AC();
  ringtoneGain = ringtoneCtx.createGain();

  ringtoneOsc1 = ringtoneCtx.createOscillator();
  ringtoneOsc2 = ringtoneCtx.createOscillator();
  ringtoneTone = ringtoneCtx.createOscillator();

  ringtoneOsc1.frequency.value = 440;
  ringtoneOsc2.frequency.value = 554;
  ringtoneTone.frequency.value = 1;

  ringtoneOsc1.type = "sine";
  ringtoneOsc2.type = "sine";
  ringtoneTone.type = "square";

  const merger = ringtoneCtx.createChannelMerger(2);
  ringtoneOsc1.connect(merger, 0, 0);
  ringtoneOsc2.connect(merger, 0, 1);

  merger.connect(ringtoneGain);
  ringtoneGain.connect(ringtoneCtx.destination);

  ringtoneGain.gain.setValueAtTime(0, ringtoneCtx.currentTime);
  ringtoneGain.gain.exponentialRampToValueAtTime(0.15, ringtoneCtx.currentTime + 0.1);
  ringtoneTone.connect(ringtoneGain.gain);

  ringtoneOsc1.start();
  ringtoneOsc2.start();
  ringtoneTone.start();
}

function stopRingtone() {
  try {
    if (ringtoneGain) ringtoneGain.gain.exponentialRampToValueAtTime(0.001, (ringtoneCtx?.currentTime || 0) + 0.3);
    setTimeout(() => {
      ringtoneOsc1?.stop();
      ringtoneOsc2?.stop();
      ringtoneTone?.stop();
      ringtoneCtx?.close();
    }, 400);
  } catch {}
  ringtoneCtx = ringtoneGain = ringtoneOsc1 = ringtoneOsc2 = ringtoneTone = null;
}

export default function useAudioCall(socket, myName) {