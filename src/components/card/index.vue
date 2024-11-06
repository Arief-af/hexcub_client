<template>
  <div class="relative p-4">
    <!-- Green shadow layer -->
    <div
      class="absolute inset-0 transform translate-x-10 -scale-75 md:scale-100 -translate-y-10 bg-primary rounded-lg"
    ></div>

    <!-- Main content layer -->
    <div
      class="relative bg-[#FBF5F2] rounded-lg p-5 md:p-10 flex items-center justify-center"
    >
      <!-- Image or content goes here -->
      <section>
        <img class="w-full" :src="image ? image : defaultImage" alt="Classroom" />
        <section v-if="content" class="mt-5">
          <h4 class="font-bold text-center text-xl">{{ title }}</h4>
          <div v-if="!detail && content" class="flex justify-center mt-3">
            <Button @click="detail = !detail" class="p-2 bg-primary text-dark hover:bg-primary">Lihat Semua</Button>
          </div>
          <p class="my-5" v-if="detail">
            {{ desc }}
          </p>
          <div v-if="detail && content" class="flex justify-center my-3">
            <Button @click="detail = !detail" class="p-2 bg-primary text-dark hover:bg-primary">Tutup</Button>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/button/index.vue";
import { ref } from "vue";
import defaultImage from "@/assets/images/hero1.png";
let detail = ref(false);
const props = defineProps({
  content: {
    type: Boolean,
    default: false,
  },
  desc : {
    type: String,
  },
  title: {
    type: String,
  },
  image : {
    type: String,
  },
})
</script>
