<template>
  <div
    class="w-full p-[51px] max-h-[280px] h-full dark:bg-[#101010] bg-primary text-white rounded-lg flex flex-col justify-between"
  >
    <div>
      <h1 class="text-[20px] sm:text-[24px]">{{ title }}</h1>
      <h1 class="text-[14px] sm:text-[16px] font-light">{{ desc }}</h1>
    </div>
    <div class="flex justify-end pt-[80px]">
      <Button
        @click="goTo(page)"
        class="bg-white dark:bg-[#1D1D1D] dark:hover:bg-[#353535] dark:text-white w-[90px] sm:w-[111px] hover:bg-gray-100 text-[#0C3E6C]"
        >Detail</Button
      >
    </div>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";
const router = useRouter();
const goTo = (path) => {
    console.log(path);
    
  router.push({ path: path });
}
const props = defineProps({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  page: { type: String, required: true },
});
</script>
