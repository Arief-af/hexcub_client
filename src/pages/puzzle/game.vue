<template>
  <DashboardLayout>
    <div
      class="relative w-full overflow-hidden flex justify-center bg-[#FBF5F2] items-center sidebar-bg rounded-[72px] mb-5 h-[452px]"
    >
      <img
        v-if="dropzone3.length > 0"
        class="max-w-[504px] max-h-[107px]"
        :src="dropzone3[0]?.img"
        alt=""
      />
      <img
        v-else
        class="max-w-[504px] max-h-[107px]"
        :src="gameInit.game"
        alt=""
      />
      <Button @click="onSubmit" class="px-[60px] rounded-full bg-primary text-white hover:bg-primary hover:text-white  absolute bottom-12 right-20">Kirim</Button>
    </div>
    <div
      class="w-full py-10 bg-primary rounded-full border-dashed flex gap-5 items-center justify-center"
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
]);

onMounted(() => {
  gameInit.value = game.value[0];
  dropzone1.value = game.value[0].options;
})

const onSubmit = () => {
    console.log({
        gameInit: gameInit.value,
    }, {
        dropzone2: dropzone2.value,
    }, {
        dropzone3: dropzone3.value,
    });
    if(dropzone2.value[0].text == gameInit.value.name && dropzone3.value[0].text == gameInit.value.color) {
        console.log('Kamu menang, YAY!');
        
    }
}

const handleDrop = (zone, event) => {
  if (!dragItem.value) return;

  // Cek apakah dropzone 2 atau 3 sudah penuh
  if (zone === 2 && dropzone2.value.length >= 1) {
    alert("Sudah ada 2 item di dropzone 2");
    return;
  } else if (zone === 3 && dropzone3.value.length >= 1) {
    alert("Sudah ada 2 item di dropzone 3");
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
</script>
