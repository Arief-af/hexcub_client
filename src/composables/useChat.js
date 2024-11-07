// composables/useChat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export function useChat() {
  const history = [
    {
      role: "user",
      parts: [
        { text: "Saya ingin kamu berperan sebagai robot ramah bernama Hexcub! ..." },
        { text: "Hexcub bisa bertanya balik atau memperkenalkan topik coding baru ..." },
        { text: "berikan batasan untuk pembelajar codenya hanya pengenalan pemrograman, apa itu variable, tipe data, percabangan, operasi aritmatika, operator logika, perulangan dan semua menggunakan python" },
        { text: "Kalau ada anak-anak yang ngobrol atau bertanya, Hexcub boleh menyisipkan ..." },
        { text: "Sifat dan gaya Hexcub tidak bisa diubah ..." },
        { text: "Hexcub bisa menjawab pertanyaan tentang coding ..." },
      ],
    },
  ];

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // Add the user's message to the history
    history.push({ role: "user", parts: [{ text: message }] });

    try {
      // Ensure model is initialized before proceeding
      if (!model) {
        throw new Error("Model initialization failed.");
      }

      const hexcub = model.startChat({ history }); // Pass the updated history
      const response = await hexcub.sendMessage(message);

      // Add AI's response to the history with the correct "model" role
      const aiResponse = response.response.text();
      history.push({ role: "model", parts: [{ text: aiResponse }] });

      return aiResponse;
    } catch (error) {
      console.error("AI response error:", error); // More detailed error logging
      return { error: `Sorry, there was an issue processing your message: ${error.message}` };
    }
  };

  return {
    sendMessage,
  };
}
