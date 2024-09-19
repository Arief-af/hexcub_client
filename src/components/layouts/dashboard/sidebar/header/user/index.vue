<template>
  <div class="flex flex-col items-center text-center gap-5">
    <Avatar class="w-[200px] h-[200px]">
      <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
    </Avatar>
    <section class="flex-col justify-center flex">
      <h3 class="text-[18px] dark:text-white text-primary font-bold">
        Radix UI
      </h3>
    </section>
  </div>
</template>

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
</script>

<style scoped></style>
