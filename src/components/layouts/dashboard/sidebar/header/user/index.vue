<template>
  <div class="flex flex-col items-center text-center gap-5">
    <Avatar class="w-[200px] h-[200px]">
      <img class="object-cover" :src="authStore.user?.image ? getBackendFullURL(authStore.user.image) : ProfileDefault"  alt="@radix-vue" />
    </Avatar>
    <section class="flex-col justify-center flex">
      <h3 class="text-[18px] dark:text-white text-primary font-bold">
        {{ authStore.user?.name }}
      </h3>
    </section>
  </div>
</template>

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileDefault from "@/assets/images/profileDefault.png";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();

console.log(authStore.user);

const getBackendFullURL = (img) => {
  return import.meta.env.VITE_API_URI + "/" + img;
};
</script>

<style scoped></style>
