<template>
  <DashboardLayout>
    <div class="w-full h-full lg:flex-row flex-col gap-10 justify-center items-center flex">
      <div class="w-full max-w-[364px]">
        <h2 class="text-3xl font-bold mb-4 text-primary">PUZZLE GAME</h2>
        <div class="lg:w-1/2 w-full lg:hidden flex mb-5">
          <img src="@/assets/images/puzzle-s.png" alt="" />
        </div>
        <p class="text-primary">
          Ayo mainkan permainan puzzle untuk mengasah logika kamu! Tarik dan
          letakan item sesuai dengan gambar tujuan!
        </p>
        <div class="flex justify-end mt-5">
          <Button @click="goTo('/puzzle/play')" class="rounded-full bg-primary hover:bg-primary px-[40px] dark:bg-primary dark:hover:bg-primary dark:text-white">
            Play
          </Button>
        </div>
      </div>
      <div class="lg:w-1/2 w-full hidden lg:flex">
        <img :src="darkMode ? PuzzleDark : PuzzleLight" alt="hero" />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { Button } from "@/components/ui/button";
import { useDarkModeStore } from "@/stores/darkmode";
import { useRouter } from "vue-router";
import { computed } from "vue";
import PuzzleDark from "@/assets/images/puzzle-dark.png";
import PuzzleLight from "@/assets/images/puzzle.png";

const router = useRouter();
const goTo = (path) => {
  router.push({ path: path });
};

// Access dark mode state reactively
const darkMode = computed(() => useDarkModeStore().darkMode);
</script>

<style lang="scss" scoped></style>
