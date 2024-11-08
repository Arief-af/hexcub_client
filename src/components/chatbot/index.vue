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
      :class="fullscreen ? 'w-[90%] h-[90%] md:w-[70%] md:-[70%]' : 'h-[450px] w-[350px]'"
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
            <box-icon
              class="cursor-pointer fill-white w-6 h-6"
              name="fullscreen"
            ></box-icon>
          </div>
          <div
            @click="toggleActive"
            class="bg-primary w-10 h-10 flex items-center rounded-full justify-center"
          >
            <box-icon
              class="cursor-pointer dark:fill-[#262626] fill-white w-7 h-7"
              type="solid"
              name="x-circle"
            ></box-icon>
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
            <box-icon class="fill-white" name="send"></box-icon>
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
const onSendMessage = async () => {
  if (!message.value) return;

  chat.value.push({ isBot: false, message: message.value });
  const resp = await sendMessage(message.value);
  message.value = "";
  chat.value.push({ isBot: true, message: resp });
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
    return `<em class="italic">\n${content}\n</em>`;  // Menambahkan newline sebelum dan sesudah
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
