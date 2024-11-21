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
            class="w-[300px] h-full dark:bg-[#1D1D1D] bg-[#F3F6F8] text-primary font-bold p-5 relative top-0 right-0 z-50"
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
            <footer class="absolute left-0 bottom-6 px-3 w-[100%]">
              <li class="cursor-pointer flex gap-2 px-2 mb-5 items-center">
                <button
                  @click="toggleDarkMode"
                  class="bg-primary rounded-lg h-[40px] w-max p-2"
                >
                  <svg  class="fill-white dark:fill-[#1D1D1D]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.4 2.096a10.08 10.08 0 0 0-8.937 3.331A10.054 10.054 0 0 0 2.096 13.4c.53 3.894 3.458 7.207 7.285 8.246a9.982 9.982 0 0 0 2.618.354l.142-.001a3.001 3.001 0 0 0 2.516-1.426 2.989 2.989 0 0 0 .153-2.879l-.199-.416a1.919 1.919 0 0 1 .094-1.912 2.004 2.004 0 0 1 2.576-.755l.412.197c.412.198.85.299 1.301.299A3.022 3.022 0 0 0 22 12.14a9.935 9.935 0 0 0-.353-2.76c-1.04-3.826-4.353-6.754-8.247-7.284zm5.158 10.909-.412-.197c-1.828-.878-4.07-.198-5.135 1.494-.738 1.176-.813 2.576-.204 3.842l.199.416a.983.983 0 0 1-.051.961.992.992 0 0 1-.844.479h-.112a8.061 8.061 0 0 1-2.095-.283c-3.063-.831-5.403-3.479-5.826-6.586-.321-2.355.352-4.623 1.893-6.389a8.002 8.002 0 0 1 7.16-2.664c3.107.423 5.755 2.764 6.586 5.826.198.73.293 1.474.282 2.207-.012.807-.845 1.183-1.441.894z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="7.5" cy="10.5" r="1.5"/><circle cx="10.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/></svg>
                </button>
                <Button
                  @click="$router.push('/login')"
                  class="p-2 w-full h-[40px]"
                  >Login</Button
                >
              </li>
            </footer>
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
            <li @click="scrollToId('halaman_utama')" class="cursor-pointer">
              Halaman Utama
            </li>
            <li @click="scrollToId('program_kita')" class="cursor-pointer">
              Program Kita
            </li>
            <li @click="scrollToId('faq')" class="cursor-pointer">FAQ</li>
            <li @click="scrollToId('contact')" class="cursor-pointer">
              Contact Us
            </li>
            <li class="cursor-pointer flex gap-2 items-center">
              <button
                @click="toggleDarkMode"
                class="bg-primary rounded-lg h-[40px] w-max p-2"
              >
                <svg class="fill-white dark:fill-[#1D1D1D]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.4 2.096a10.08 10.08 0 0 0-8.937 3.331A10.054 10.054 0 0 0 2.096 13.4c.53 3.894 3.458 7.207 7.285 8.246a9.982 9.982 0 0 0 2.618.354l.142-.001a3.001 3.001 0 0 0 2.516-1.426 2.989 2.989 0 0 0 .153-2.879l-.199-.416a1.919 1.919 0 0 1 .094-1.912 2.004 2.004 0 0 1 2.576-.755l.412.197c.412.198.85.299 1.301.299A3.022 3.022 0 0 0 22 12.14a9.935 9.935 0 0 0-.353-2.76c-1.04-3.826-4.353-6.754-8.247-7.284zm5.158 10.909-.412-.197c-1.828-.878-4.07-.198-5.135 1.494-.738 1.176-.813 2.576-.204 3.842l.199.416a.983.983 0 0 1-.051.961.992.992 0 0 1-.844.479h-.112a8.061 8.061 0 0 1-2.095-.283c-3.063-.831-5.403-3.479-5.826-6.586-.321-2.355.352-4.623 1.893-6.389a8.002 8.002 0 0 1 7.16-2.664c3.107.423 5.755 2.764 6.586 5.826.198.73.293 1.474.282 2.207-.012.807-.845 1.183-1.441.894z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="7.5" cy="10.5" r="1.5"/><circle cx="10.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/></svg>
              </button>
              <Button @click="$router.push('/login')" class="p-2 h-[40px]"
                >Login</Button
              >
            </li>
          </ul>
        </section>
      </nav>
    </header>
    <main class="mt-[90px]">
      <slot />
    </main>
    <footer
      class="mt-20 h-full-[40px] bottom-0 text-center w-full md:px-[28px] py-[28px] dark:bg-[#1E2925] dark:text-white bg-[#FBF5F2]"
    >
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
import { useDarkModeStore } from "@/stores/darkmode";

function toggleDarkMode() {
  useDarkModeStore().toggle();
}
const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -200; // Offset scroll sebesar -200px
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

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
