<template>
  <DashboardLayout>
    <Modal
      v-model="isModalOpen"
      title="Confirmation"
      :primary="win"
      @confirm="handleConfirm"
    >
      <section v-if="win" class="flex flex-col items-center text-center">
        <img src="@/assets/check.svg" alt="check" />
        <p class="text-center text-xl font-bold text-white mt-5">
          Jawaban Kamu Benar!
        </p>
        <div class="flex mt-5 gap-2">
          <Button
            class="bg-primary text-white hover:bg-primary hover:text-white"
            @click="goTo('/puzzle')"
            >Kembali</Button
          >
          <Button
            @click="restartGame"
            class="bg-white text-primary hover:bg-white hover:text-primary"
            >Main Lagi</Button
          >
        </div>
      </section>
      <section v-else class="flex flex-col items-center text-center">
        <img src="@/assets/wrong.svg" alt="check" />
        <p class="text-center text-xl font-bold text-white mt-5">
          Jawaban Kamu Salah!
        </p>
        <div class="flex mt-5 gap-2">
          <Button
            class="bg-red-500 text-white hover:bg-red-500 hover:text-white"
            @click="goTo('/puzzle')"
            >Kembali</Button
          >
          <Button
            @click="isModalOpen = false"
            class="bg-white text-red-500 hover:bg-white hover:text-red-500"
            >Coba Lagi</Button
          >
        </div>
      </section>
    </Modal>
    <div
      class="relative w-full overflow-hidden flex justify-center bg-[#FBF5F2] items-center sidebar-bg rounded-[72px] mb-5 h-[452px]"
    >
      <div>
        <div class="font-bold text-xl text-center mb-5 uppercase text-primary">
          {{ gameInit.name }}
        </div>
        <img
          v-if="dropzone3.length > 0 && dropzone2.length > 0"
          class=""
          :src="dropzone3[0]?.img"
          alt=""
        />
        <img v-else class="" :src="gameInit.game" alt="" />
      </div>
      <div class="absolute bottom-8 flex gap-2 right-20">
        <Button
          @click="toggleBGM"
          class="px-[10px] rounded-full bg-primary text-white dark:bg-primary dark:text-white hover:bg-primary hover:text-white "
          >
          <svg v-if="isBGMPlaying" class="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"/><path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20V4a1 1 0 0 0-1.554-.832L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h3c.033 0 .061-.016.093-.019a1.027 1.027 0 0 0 .38-.116c.026-.015.057-.017.082-.033L12 5.868v12.264l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9z"/></svg>
          <svg v-else class="fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m21.707 20.293-2.023-2.023A9.566 9.566 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.113 8.113 0 0 1-1.672 4.913l-1.285-1.285C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V4a1 1 0 0 0-1.554-.832L7.727 6.313l-4.02-4.02-1.414 1.414 18 18 1.414-1.414zM12 5.868v4.718L9.169 7.755 12 5.868zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20v-1.879l-2-2v2.011l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9h.879L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"/></svg>
          </Button
        >
        <Button
          @click="openModal"
          class="px-[60px] rounded-full bg-primary text-white dark:bg-primary dark:text-white hover:bg-primary hover:text-white "
          >Kirim</Button
        >
      </div>
    </div>
    <div
      class="w-full py-10 px-10 bg-primary rounded-full border-dashed flex gap-5 items-center justify-center"
      @dragover.prevent
      @drop="handleDrop(1, $event)"
    >
      <div
        v-for="(item, index) in dropzone1"
        :key="index"
        :draggable="true"
        @dragstart="dragItem = { item, fromZone: 1 }"
        :class="
          item.color == 'bg-white'
            ? item.color + ' text-black'
            : item.color + ' text-white'
        "
        class="w-[200px] h-[63px] py-2 mt-2 rounded-full items-center flex justify-center cursor-pointer"
      >
        {{ item.text }}
      </div>
    </div>
    <div
      class="flex-wrap mt-10 py-5 rounded-lg px-5 md:rounded-full flex justify-center items-center gap-5 bg-primary"
    >
      <span class="text-xl font-bold text-white">IF</span>
      <!-- Dropzone 2 -->
      <div
        class="w-[200px] h-[75px] px-2 py-2 bg-gray-100 border-2 flex rounded-full items-center justify-center"
        @dragover.prevent
        @drop="handleDrop(2, $event)"
      >
        <div
          v-for="(item, index) in dropzone2"
          :key="index"
          :draggable="true"
          @dragstart="dragItem = { item, fromZone: 2 }"
          :class="
            item.color == 'bg-white'
              ? item.color + ' text-black'
              : item.color + ' text-white'
          "
          class="w-[200px] h-[63px] rounded-full items-center flex justify-center cursor-pointer"
        >
          {{ item.text }}
        </div>
      </div>
      <span class="text-xl font-bold text-white">THEN COLOR</span>
      <!-- Dropzone 3 -->
      <div
        class="w-[200px] h-[75px] px-2 py-2 bg-gray-100 border-2 flex rounded-full items-center justify-center"
        @dragover.prevent
        @drop="handleDrop(3, $event)"
      >
        <p class="text-gray-500"></p>
        <div
          v-for="(item, index) in dropzone3"
          :key="index"
          :draggable="true"
          @dragstart="dragItem = { item, fromZone: 3 }"
          :class="
            item.color == 'bg-white'
              ? item.color + ' text-black'
              : item.color + ' text-white'
          "
          class="w-[200px] h-[63px] rounded-full items-center flex justify-center cursor-pointer"
        >
          {{ item.text }}
        </div>
      </div>
    </div>

    <audio ref="audioPop" controls class="hidden">
      <source src="@/assets/sounds/pop.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    <audio ref="bgmAudio" loop autoplay class="hidden">
      <source src="@/assets/sounds/bgm.m4a" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    <audio ref="loseAudio" class="hidden">
      <source src="@/assets/sounds/lose.wav" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    <audio ref="winAudio" class="hidden">
      <source src="@/assets/sounds/win.wav" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    <audio ref="warnAudio" class="hidden">
      <source src="@/assets/sounds/warn.wav" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </DashboardLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { Button } from "@/components/ui/button";
import orangeCorrect from "@/assets/images/game-orange-correct.png";
import orangeGreen from "@/assets/images/game-orange-green.png";
import orangeWhite from "@/assets/images/game-orange-white.png";
import orangeBlue from "@/assets/images/game-orange-blue.png";

import bananaCorrect from "@/assets/images/game-banana-correct.png";
import bananaPurple from "@/assets/images/game-banana-purple.png";
import bananaWhite from "@/assets/images/game-banana-white.png";
import bananaBlue from "@/assets/images/game-banana-blue.png";

import tomatoCorrect from "@/assets/images/game-tomato-correct.png";
import tomatoPurple from "@/assets/images/game-tomato-purple.png";
import tomatoWhite from "@/assets/images/game-tomato-white.png";
import tomatoYellow from "@/assets/images/game-tomato-yellow.png";

import Modal from "@/components/modal/index.vue";
import { useRouter } from "vue-router";
import { useNotificationStore } from "../../stores/notification";

const audioPop = ref(null);  // Reference for sound effect
const bgmAudio = ref(null);  // Reference for background music
const loseAudio = ref(null);  // Reference for background music
const winAudio = ref(null);  // Reference for background music
const warnAudio = ref(null);  // Reference for background music

const isBGMPlaying = ref(true);
const notificationStore = useNotificationStore();
const router = useRouter();
const goTo = (path) => {
  console.log(path);
  router.push({ path: path });
};

const win = ref(null);

const playAudio = (audio) => {
  if (audio && audio.paused) {
    audio.play();
  }
};

const toggleBGM = () => {
  if (bgmAudio.value.paused) {
    bgmAudio.value.play();
    isBGMPlaying.value = true;
  } else {
    isBGMPlaying.value = false;
    bgmAudio.value.pause();
  }
};

const dropzone1 = ref([]);
const dropzone2 = ref([]);
const dropzone3 = ref([]);
const dragItem = ref(null);
const gameInit = ref({});
const game = ref([
  {
    game: orangeWhite,
    name: "orange",
    color: "orange",
    options: [
      { color: "bg-white", text: "orange", img: orangeCorrect },
      { color: "bg-blue-500", text: "blue", img: orangeBlue },
      { color: "bg-green-500", text: "green", img: orangeGreen },
      { color: "bg-orange-500", text: "orange", img: orangeCorrect },
    ],
  },
  {
    game: bananaWhite,
    name: "banana",
    color: "yellow",
    options: [
      { color: "bg-white", text: "banana", img: bananaCorrect },
      { color: "bg-blue-500", text: "blue", img: bananaBlue },
      { color: "bg-purple-500", text: "purple", img: bananaPurple },
      { color: "bg-yellow-500", text: "yellow", img: bananaCorrect },
    ],
  },
  {
    game: tomatoWhite,
    name: "tomato",
    color: "red",
    options: [
      { color: "bg-white", text: "tomato", img: tomatoWhite },
      { color: "bg-red-500", text: "red", img: tomatoCorrect },
      { color: "bg-purple-500", text: "purple", img: tomatoPurple },
      { color: "bg-yellow-500", text: "yellow", img: tomatoYellow },
    ],
  },
]);

onMounted(() => {
  playAudio(bgmAudio.value);
  const randomGame = Math.floor(Math.random() * game.value.length);

  gameInit.value = game.value[randomGame];
  dropzone1.value = game.value[randomGame].options;
});

const onSubmit = () => {
  if (
    dropzone2.value[0].text == gameInit.value.name &&
    dropzone3.value[0].text == gameInit.value.color
  ) {
    win.value = true;
    playAudio(winAudio.value);
  } else {
    win.value = false;
    playAudio(loseAudio.value);
  }
};

const handleDrop = (zone, event) => {
  playAudio(audioPop.value)
  if (!dragItem.value) return;

  // Cek apakah dropzone 2 atau 3 sudah penuh
  if (zone === 2 && dropzone2.value.length >= 1) {
    playAudio(warnAudio.value)
    notificationStore.showNotification(
      "Keluarkan dulu item ini untuk mengganti dengan item lain", "warning"
    )
    return;
  } else if (zone === 3 && dropzone3.value.length >= 1) {
    playAudio(warnAudio.value)
    notificationStore.showNotification(
      "Keluarkan dulu item ini untuk mengganti dengan item lain", "warning"
    )
    return;
  }

  if (dragItem.value.fromZone === 1 && zone !== 1) {
    dropzone1.value = dropzone1.value.filter((i) => i !== dragItem.value.item);
    if (zone === 2) {
      dropzone2.value.push(dragItem.value.item);
    } else if (zone === 3) {
      dropzone3.value.push(dragItem.value.item);
    }
  } else if (dragItem.value.fromZone === 2 && zone !== 2) {
    dropzone2.value = dropzone2.value.filter((i) => i !== dragItem.value.item);
    if (zone === 1) {
      dropzone1.value.push(dragItem.value.item);
    } else if (zone === 3) {
      dropzone3.value.push(dragItem.value.item);
    }
  } else if (dragItem.value.fromZone === 3 && zone !== 3) {
    dropzone3.value = dropzone3.value.filter((i) => i !== dragItem.value.item);
    if (zone === 1) {
      dropzone1.value.push(dragItem.value.item);
    } else if (zone === 2) {
      dropzone2.value.push(dragItem.value.item);
    }
  }

  dragItem.value = null;
};

const isModalOpen = ref(false);

const openModal = () => {
  onSubmit();
  isModalOpen.value = true;
};

const handleConfirm = () => {
  console.log("Confirmed!");
};

const restartGame = () => {
  const randomGame = Math.floor(Math.random() * game.value.length);
  gameInit.value = game.value[randomGame];
  dropzone1.value = gameInit.value.options;
  dropzone2.value = [];
  dropzone3.value = [];

  isModalOpen.value = false;
};
</script>
