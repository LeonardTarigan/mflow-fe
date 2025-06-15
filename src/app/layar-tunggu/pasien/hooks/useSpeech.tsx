export default function useSpeech() {
  async function playCallQueue(queueNumber: string) {
    const openingSound = new Audio("/assets/audio/announcement-opening.mp3");
    // const closingSound = new Audio("/assets/audio/announcement-closing.mp3");

    // Ensure voices are loaded
    const getVoices = (): Promise<SpeechSynthesisVoice[]> =>
      new Promise((resolve) => {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) return resolve(voices);

        speechSynthesis.onvoiceschanged = () => {
          resolve(speechSynthesis.getVoices());
        };
      });

    const voices = await getVoices();
    const indonesianVoice = voices.find((v) => v.lang === "id-ID");

    const text = getIndonesianSpokenText(queueNumber);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    if (indonesianVoice) utterance.voice = indonesianVoice;

    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }

    const playAudio = (audio: HTMLAudioElement) =>
      new Promise<void>((resolve) => {
        audio.play();
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
      });

    const speak = (utt: SpeechSynthesisUtterance) =>
      new Promise<void>((resolve) => {
        utt.onend = () => {
          resolve();
        };
        utt.onerror = () => {
          resolve();
        };
        speechSynthesis.speak(utt);
      });

    await playAudio(openingSound);
    speak(utterance);
    // await playAudio(closingSound);
  }

  function getIndonesianSpokenText(queueNumber: string): string {
    const digitMap: Record<string, string> = {
      "0": "nol",
      "1": "satu",
      "2": "dua",
      "3": "tiga",
      "4": "empat",
      "5": "lima",
      "6": "enam",
      "7": "tujuh",
      "8": "delapan",
      "9": "sembilan",
    };

    const match = queueNumber.match(/^U(\d{3})$/i);
    if (!match) return "";

    const digits = match[1]
      .split("")
      .map((d) => digitMap[d])
      .join(", ");

    return `Nomor antrian, U,  ${digits}, silakan menuju ruang periksa`;
  }

  return { playCallQueue, getIndonesianSpokenText };
}
