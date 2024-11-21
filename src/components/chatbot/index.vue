<template>
  <div
    :class="
      fullscreen
        ? 'justify-center bg-primary top-0 left-0 z-50 w-screen h-screen flex items-center'
        : 'asbolute md:bottom-8 md:right-8 bottom-3 right-3'
    "
    class="fixed"
  >
    <div
      v-if="active"
      :class="
        fullscreen
          ? 'w-[90%] h-[90%] md:w-[70%] md:-[70%]'
          : 'h-[450px] w-[350px]'
      "
      class="dark:bg-[#262626] dark:border dark:border-primary bg-secondary shadow-lg p-5 rounded-3xl"
    >
      <header class="flex gap-2 pb-4 justify-between items-center">
        <div class="flex gap-2 items-center">
          <img
            class="w-12 h-12"
            src="@/assets/images/profileDefault.png"
            alt="logo"
          />
          <span class="text-primary font-bold">Hexcub Bot</span>
        </div>
        <div class="flex gap-1">
          <div
            @click="fullscreen = !fullscreen"
            class="bg-primary w-10 h-10 flex items-center rounded-full justify-center"
          >
          <svg  class="cursor-pointer fill-white w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"/></svg>
          </div>
          <div
            @click="toggleActive"
            class="bg-primary w-10 h-10 flex items-center rounded-full justify-center"
          >
          <svg class="cursor-pointer dark:fill-[#262626] fill-white w-7 h-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"/><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"/></svg>
          </div>
        </div>
      </header>
      <main class="h-[calc(100%-128px)] px-2 overflow-auto">
        <div
          v-for="(item, index) in chat"
          :key="index"
          :class="item.isBot ? 'justify-start' : 'justify-end'"
          class="flex"
        >
          <div
            v-html="formatText(item.message)"
            class="bg-primary rounded-lg p-5 w-max max-w-[80%] mb-4 text-sm text-white"
          ></div>
        </div>
        <div class="justify-start" v-if="loading">
          <div
            class="bg-primary rounded-lg p-5 w-max max-w-[80%] mb-4 text-sm text-white"
          >
            Tunggu Sebentar &nbsp;
            <svg
              aria-hidden="true"
              class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </main>
      <footer class="relative w-full items-center mt-5">
        <form @submit.prevent="onSendMessage">
          <FormInputBot
            v-model="message"
            placeholder="Tanyakan di sini"
          ></FormInputBot>
          <Button
            type="submit"
            class="absolute right-0 inset-y-0 bg-primary flex items-center justify-center w-16 h-10 dark:bg-primary rounded-full hover:bg-primary dark:hover:bg-primary"
          >
            <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"/></svg>
          </Button>
        </form>
      </footer>
    </div>
    <img
      v-else
      @click="toggleActive"
      class="w-20 rounded-full h-20 shadow-xl cursor-pointer"
      src="@/assets/images/profileDefault.png"
      alt="chatbot"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useChat } from "@/composables/useChat";
import FormInputBot from "@/components/form/inputBot.vue";

const { sendMessage } = useChat();
onMounted(async () => {});
let fullscreen = ref(false);
let loading = ref(false);
const onSendMessage = async () => {
  loading.value = true;
  let messageValue = ref(message.value);
  if (!message.value) return;
  message.value = "";
  chat.value.push({ isBot: false, message: messageValue.value });
  const resp = await sendMessage(messageValue.value);
  chat.value.push({ isBot: true, message: resp });
  loading.value = false;
};

let message = ref("");
let chat = ref([
  {
    isBot: true,
    message: "Hai! Aku Hexcub Bot, Siap bantu kamu belajar!",
  },
]);
// Fungsi untuk memformat teks
function formatText(inputText) {
  // Format kode
  const codeRegex = /```(.*?)```/gs;
  inputText = inputText.replace(codeRegex, (match, code) => {
    return `<pre class="bg-secondary p-4 my-3 rounded-md text-primary overflow-x-auto"><code class="language-python whitespace-pre-wrap">${code.trim()}</code></pre>`;
  });

  // Format bold (untuk **bold text**)
  const boldRegex = /\*\*(.*?)\*\*/g;
  inputText = inputText.replace(boldRegex, (match, content) => {
    return `<strong class="font-bold">${content}</strong>`;
  });

  // Format italic (untuk *italic text*)
  const italicRegex = /\*(.*?)\*/g;
  inputText = inputText.replace(italicRegex, (match, content) => {
    return `<em class="italic">\n${content}\n</em>`; // Menambahkan newline sebelum dan sesudah
  });

  // Format underline (untuk __underline text__)
  const underlineRegex = /__(.*?)__/g;
  inputText = inputText.replace(underlineRegex, (match, content) => {
    return `<u class="underline">${content}</u>`;
  });

  // Kamu bisa menambahkan lebih banyak format jika diperlukan

  return inputText;
}

let active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
  fullscreen.value = fullscreen.value ? false : false;
};
</script>

<style>
.code-block {
  background-color: #f7f7f7;
  padding: 10px;
  text-wrap: normal;
  border-radius: 5px;
  border: 1px solid #ddd;
}

code {
  font-size: 14px;
  color: #333;
  display: block;
}
</style>
