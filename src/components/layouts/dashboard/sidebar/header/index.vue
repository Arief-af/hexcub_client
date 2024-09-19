<template>
  <header class="flex justify-between items-center">
    <h3 class="text-[20px] dark:text-white text-[#0C3E6C] font-normal">
    </h3>
    <div
      @click="useSidebarStore().toggle()"
      class="w-[53px] h-[53px] dark:bg-[#1D1D1D] cursor-pointer bg-white rounded-full flex justify-center items-center"
    >
      <img src="@/components/layouts/dashboard/icons/collapse.svg" alt="icon" />
    </div>
  </header>
  <User class="mt-[32px] mb-[37px]" />
</template>

<script setup>
import { useSidebarStore } from "@/stores/sidebar";
import User from "@/components/layouts/dashboard/sidebar/header/user/index.vue";
</script>
