<template>
  <div class="relative min-h-screen dark:bg-[#262626] bg-[#FFF] w-full">
    <Transition name="overlay">
      <div
        v-if="useSidebarStore().sidebar"
        class="w-full lg:hidden fixed bg-black bg-opacity-50 top-0 h-full z-40"
      ></div>
    </Transition>
    <Transition>
      <section class="lg:hidden" v-if="useSidebarStore().sidebar">
        <div class="fixed top-0 right-0 h-full z-50">
          <div
            class="w-[300px] h-full dark:bg-[#1D1D1D] bg-[#F3F6F8] text-primary font-bold p-5 absolute top-0 right-0 z-50"
          >
            <header class="flex justify-between items-center">
              <img class="h-[40px]" src="@/assets/images/logo.png" alt="logo" />
              <div
                @click="useSidebarStore().toggle()"
                class="w-[53px] h-[53px] dark:bg-[#1D1D1D] cursor-pointer bg-white rounded-full flex justify-center items-center"
              >
                <img
                  class="transform -scale-x-100"
                  src="@/components/layouts/dashboard/icons/collapse.svg"
                  alt="icon"
                />
              </div>
            </header>
            <main class="mt-10">
              <sidebarMenu />
            </main>
          </div>
        </div>
      </section>
    </Transition>

    <header class="fixed top-0 left-0 right-0 z-30">
      <nav
        class="h-[90px] backdrop-blur-md dark:bg-[#262626] bg-[#FFF] flex justify-between items-center px-[40px] md:px-[69px]"
      >
        <section>
          <img class="h-[40px]" src="@/assets/images/logo.png" alt="logo" />
        </section>
        <div
          @click="useSidebarStore().toggle()"
          class="w-[53px] lg:hidden h-[53px] dark:bg-[#1D1D1D] cursor-pointer bg-white rounded-full flex justify-center items-center"
        >
          <img
            src="@/components/layouts/dashboard/icons/collapse.svg"
            alt="icon"
          />
        </div>
        <section class="lg:flex hidden">
          <ul class="flex gap-10 items-center text-primary font-semibold">
            <li @click="scrollToId('halaman_utama')" class="cursor-pointer">Halaman Utama</li>
            <li @click="scrollToId('program_kita')" class="cursor-pointer">Program Kita</li>
            <li @click="scrollToId('faq')" class="cursor-pointer">FAQ</li>
            <li @click="scrollToId('contact')" class="cursor-pointer">Contact Us</li>
            <li class="cursor-pointer">
              <Button class="p-2">Login</Button>
            </li>
          </ul>
        </section>
      </nav>
    </header>
    <main class="mt-[90px]">
      <slot />
    </main>
    <footer class="mt-20 h-full-[40px] bottom-0 text-center w-full md:px-[28px] py-[28px] dark:bg-[#1E2925] dark:text-white bg-[#FBF5F2]">
      ©2024 Codeisfun. All rights reserved. 
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Dropdown from "@/components/dropdown/index.vue";
import Button from "@/components/button/index.vue";
import { useSidebarStore } from "@/stores/sidebar";
import sidebarMenu from "@/components/layouts/landing/sidebar/menu/index.vue";
const activeDropdown = ref(null);

const setActiveDropdown = (index) => {
  activeDropdown.value = index;
};

const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -200; // Offset scroll sebesar -200px
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    // Coba scroll dengan document.documentElement untuk kompatibilitas mobile
    document.documentElement.scrollTo({ top: y, behavior: "smooth" });
    
    // Fallback jika scrollTo pada documentElement tidak berhasil
    if (document.documentElement.scrollTop === 0) {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
};



const dropdownItems = [
  { label: "Tutorial Video Online", link: "#" },
  { label: "Google Meet Session", link: "#" },
  { label: "Puzzle Game", link: "#" },
];
</script>

<style scoped>
.side-enter-active,
.side-leave-active {
  transition: transform 0.4s ease-in-out; /* Reduced duration and added opacity */
}

.side-enter-from,
.side-leave-to {
  transform: translateX(100%); /* Sidebar starts off-screen */
}

.side-enter-to,
.side-leave-from {
  transform: translateX(0); /* Sidebar moves into view */
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease-in-out; /* Adjust opacity for the overlay */
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
.overlay-enter-to,
.overlay-leave-from {
  opacity: 1;
}
</style>
