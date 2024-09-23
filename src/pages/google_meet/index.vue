<template>
  <DashboardLayout>
    <header class="text-2xl font-bold text-primary">Google Meet</header>
    <main
      class="bg-primary text-white px-10 xl:px-40 rounded-3xl h-[431px] mt-5 flex items-center"
    >
      <section>
        <span class="text-[26px]">Minggu, Pk. 08.00 - 10.00 <br /></span>
        <span class="font-bold text-[26px]">Kenalan Dengan JS </span> <br />
        <span class="text-[20px]">Bersama kak </span>
      </section>
    </main>
    <div class="text-center mt-5">
      <Button
        class="px-16 dark:bg-[#449072] dark:text-white dark:hover:bg-primary dark:hover:text-white bg-[#449072] text-white hover:bg-primary hover:text-white"
        >Join</Button
      >
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { Button } from "@/components/ui/button";
</script>

<style lang="scss" scoped></style>
